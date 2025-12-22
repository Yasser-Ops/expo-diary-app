import { Request, Response, NextFunction } from 'express';
import {
  createEntry,
  deleteEntry,
  getEntry,
  listEntries,
  updateEntry,
} from '../services/entryService.js';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const entries = await listEntries(req.user!.id);
    res.json(entries);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const entry = await createEntry(req.user!.id, req.body);
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
  try {
    const entry = await getEntry(req.user!.id, req.params.id);
    res.json(entry);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const entry = await updateEntry(req.user!.id, req.params.id, req.body);
    res.json(entry);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteEntry(req.user!.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
