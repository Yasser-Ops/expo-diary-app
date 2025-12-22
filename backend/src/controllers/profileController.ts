import { NextFunction, Request, Response } from 'express';
import { getProfile, updateProfile } from '../services/profileService.js';

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await getProfile(req.user!.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await updateProfile(req.user!.id, req.body);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}
