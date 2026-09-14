import { prisma } from '../configs/prisma.js';

export const addCompany = async (req, res) => {
  try {
    const { name, description, municipalityId, contactEmail, contactPhone } =
      req.body;
    const userId = req.user.id;

    const companyExists = await prisma.company.findUnique({
      where: { userId },
    });

    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: 'Company already exists for this user',
      });
    }

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

    const createdCompany = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { role: 'COMPANY' },
      });

      return tx.company.create({
        data: {
          userId,
          name,
          description,
          contactEmail,
          contactPhone,
          status: 'APPROVED',
          regionId: Number(municipality.regionId),
          municipalityId: Number(municipalityId),
        },
        include: {
          user: true,
          region: true,
          municipality: true,
        },
      });
    });

    return res.status(201).json({
      success: true,
      message: 'Company created successfully',
      data: createdCompany,
    });
  } catch (error) {
    console.error('Add company error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add the company',
    });
  }
};

export const getCompanyStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const companyExists = await prisma.company.findUnique({
      where: { userId },
    });

    if (!companyExists) {
      return res.status(400).json({
        success: false,
        message: 'No company registered for this user',
        data: { status: null },
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Status retrieved for registered company',
      data: { status: companyExists.status },
    });
  } catch (error) {
    console.error('Get company status error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get company status',
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await prisma.company.findMany({
      include: {
        user: true,
        region: true,
        municipality: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Got all companies successfully',
      data: allCompanies,
    });
  } catch (error) {
    console.error('Get all companies error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get companies',
    });
  }
};

export const updateCompanyStatus = async (req, res) => {
  try {
    const companyId = Number(req.params.id);
    const { status } = req.body;

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid company status',
      });
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        user: true,
        municipality: true,
        region: true,
      },
    });

    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: 'No company found with this id' });
    }

    const user = await prisma.user.findUnique({
      where: { id: company.userId },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'No user found with this the company',
      });
    }

    if (status === 'APPROVED') {
      await prisma.user.update({
        where: { id: company.userId },
        data: { role: 'COMPANY' },
      });
    }

    const updatedCompanyStatus = await prisma.company.update({
      where: {
        id: companyId,
      },
      data: { status },
      include: {
        user: true,
        region: true,
        municipality: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Company status and user role updated',
      data: updatedCompanyStatus,
    });
  } catch (error) {
    console.error('Get all companies error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get companies',
    });
  }
};
