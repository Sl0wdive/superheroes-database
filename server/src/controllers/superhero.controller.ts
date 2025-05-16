import { Request, Response } from 'express';
import Superhero from '../models/superhero.model';
import { asyncHandler } from '../middleware/asyncHandler';

export const getAllSuperheroes = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const total = await Superhero.countDocuments();
  const superheroes = await Superhero.find().skip(skip).limit(limit);

  res.json({
    total,
    page,
    data: superheroes.map(hero => ({
      id: hero._id,
      nickname: hero.nickname,
      images: hero.images[0] || null
    }))
  });
});

export const getSuperheroById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const superhero = await Superhero.findById(id);

  if (!superhero) return res.status(404).json({ message: 'Superhero not found' });

  res.json(superhero);
});

export const createSuperhero = asyncHandler(async (req: Request, res: Response) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
  const files = req.files as Express.Multer.File[];

  const newSuperhero = new Superhero({
    nickname,
    real_name,
    origin_description,
    superpowers,
    catch_phrase,
    images: files?.map(file => file.filename) || []
  });

  await newSuperhero.save();
  res.status(201).json(newSuperhero);
});

export const updateSuperhero = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
  const files = req.files as Express.Multer.File[];

  const superhero = await Superhero.findById(id);
  if (!superhero) return res.status(404).json({ message: 'Superhero not found' });

  if (nickname) superhero.nickname = nickname;
  if (real_name) superhero.real_name = real_name;
  if (origin_description) superhero.origin_description = origin_description;
  if (superpowers) superhero.superpowers = superpowers;
  if (catch_phrase) superhero.catch_phrase = catch_phrase;
  if (files?.length) superhero.images.push(...files.map(file => file.filename));

  await superhero.save();
  res.json(superhero);
});

export const deleteSuperhero = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const superhero = await Superhero.findById(id);
  if (!superhero) return res.status(404).json({ message: 'Superhero not found' });

  await superhero.deleteOne();
  res.json({ message: 'Superhero deleted' });
});