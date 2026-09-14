import { prisma } from '../configs/prisma.js';
import { toArray } from '../helpers/helpers.js';

export const getJobs = async (req, res) => {
  try {
    const { title, location } = req.query;
    const types = toArray(req.query.type);
    const modes = toArray(req.query.mode);
    const rawPage = Number(req.query.page) || 1;
    const rawLimit = Number(req.query.limit) || 9;
    const sortKey = req.query.sort || 'recent';

    const safePage = Math.max(rawPage, 1);
    const safeLimit = Math.min(Math.max(rawLimit, 1), 100);
    const skip = (safePage - 1) * safeLimit;

    const SORT_MAP = {
      recent: { createdAt: 'desc' },
    };

    if (!SORT_MAP[sortKey]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sort option',
      });
    }

    let locationWhere = {};

    if (location) {
      const [type, id] = location.split('-');

      if (type === 'region') {
        locationWhere = { regionId: Number(id) };
      } else if (type === 'municipality') {
        locationWhere = { municipalityId: Number(id) };
      } else {
        return res.status(400).json({
          success: false,
          message: 'Invalid location type',
        });
      }
    }

    const where = {
      ...(title && {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      }),
      ...locationWhere,
      ...(types.length > 0 && {
        type: {
          in: types,
        },
      }),
      ...(modes.length > 0 && {
        workMode: {
          in: modes,
        },
      }),
    };

    const shouldLoadTitleSuggestions =
      typeof title === 'string' && title.trim().length >= 2;

    const titleSuggestionsQuery = shouldLoadTitleSuggestions
      ? prisma.job.groupBy({
          by: ['title'],
          where,
          _count: {
            _all: true,
          },
          orderBy: [
            {
              _count: {
                title: 'desc',
              },
            },
            {
              title: 'asc',
            },
          ],
          take: 8,
        })
      : Promise.resolve([]);

    const [totalJobs, jobs, groupedTitleSuggestions] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: SORT_MAP[sortKey],
        select: {
          id: true,
          title: true,
          type: true,
          description: true,
          salary: true,
          workMode: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          municipality: {
            select: {
              id: true,
              name: true,
            },
          },
          region: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      titleSuggestionsQuery,
    ]);

    const titleSuggestions = groupedTitleSuggestions.map((suggestion) => ({
      title: suggestion.title,
      count: suggestion._count._all,
    }));

    const totalPages = Math.ceil(totalJobs / safeLimit);

    return res.status(200).json({
      success: true,
      data: jobs,
      titleSuggestions,
      pagination: {
        totalJobs,
        totalPages,
        currentPage: safePage,
        limit: safeLimit,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
    });
  } catch (error) {
    console.error('getJobs error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true, municipality: true, region: true },
    });

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error('getSingleJob error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createSingleJob = async (req, res) => {
  try {
    const company = req.company;

    const { title, type, description, salary, workMode, municipalityId } =
      req.body;

    const municipality = await prisma.municipality.findUnique({
      where: {
        id: municipalityId,
      },
    });

    if (!municipality) {
      return res
        .status(400)
        .json({ success: 'false', message: 'Invalid municipality' });
    }

    const job = await prisma.job.create({
      data: {
        title,
        type: type,
        description,
        salary,
        companyId: company.id,
        workMode,
        regionId: Number(municipality.regionId),
        municipalityId: Number(municipalityId),
      },
      include: {
        company: true,
        region: true,
        municipality: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job,
    });
  } catch (error) {
    console.error('Create job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create job',
    });
  }
};

export const updateSingleJob = async (req, res) => {
  const jobId = Number(req.params.id);

  try {
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    if (existingJob.companyId !== req.company.id) {
      return res.status(403).json({
        success: false,
        message: 'you are not allowed to updet this job',
      });
    }

    const { title, type, description, salary, workMode, municipalityId } =
      req.body;

    const municipality = await prisma.municipality.findUnique({
      where: {
        id: municipalityId,
      },
    });

    if (!municipality) {
      return res
        .status(400)
        .json({ success: 'false', message: 'Invalid municipality' });
    }

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        type,
        description,
        salary,
        workMode,
        regionId: Number(municipality.regionId),
        municipalityId: Number(municipalityId),
      },
      include: {
        company: true,
        municipality: true,
        region: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    console.error('Update job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update job',
    });
  }
};

export const deleteSingleJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: 'Job Not Found',
      });
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Delete job error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete job',
    });
  }
};
