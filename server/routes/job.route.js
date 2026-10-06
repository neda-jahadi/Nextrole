import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createSingleJob,
  deleteSingleJob,
  getJobs,
  getSingleJob,
  updateSingleJob,
} from '../controllers/job.controller.js';
import { addJobSchema } from '../validators/addJobValidators.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { companyApprovedCheck } from '../middlewares/companyMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getSingleJob);
router.post(
  '/',
  authMiddleware,
  authorizeRoles('COMPANY'),
  companyApprovedCheck,
  validateRequest(addJobSchema),
  createSingleJob,
);
router.delete(
  '/:id',
  authMiddleware,
  authorizeRoles('COMPANY'),
  companyApprovedCheck,
  deleteSingleJob,
);
router.put(
  '/:id',
  authMiddleware,
  authorizeRoles('COMPANY'),
  companyApprovedCheck,
  validateRequest(addJobSchema),
  updateSingleJob,
);

export default router;
