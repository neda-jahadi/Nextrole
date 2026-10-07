import { Prisma } from '@prisma/client';

const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid data provided';
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      statusCode = 400;
      message = `${field} already exists`;
    }

    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Record not found';
    }

    if (err.code === 'P2003') {
      statusCode = 400;
      message = 'Invalid reference: related record does not exist';
    }
  }

  if (statusCode >= 500) {
    message = 'Internal server error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export { notFound, errorHandler };
