import { Router } from 'express';
import { upload } from '../middleware/upload';
import { asyncHandler } from '../middleware/asyncHandler';
import {
  getAllSuperheroes,
  getSuperheroById,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from '../controllers/superhero.controller';

const router = Router();

router.get('/', asyncHandler(getAllSuperheroes));
router.get('/:id', asyncHandler(getSuperheroById));

router.post('/', upload.array('images', 5), asyncHandler(createSuperhero));
router.put('/:id', upload.array('images', 5), asyncHandler(updateSuperhero));

router.delete('/:id', asyncHandler(deleteSuperhero));

export default router;