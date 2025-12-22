import { prisma } from '../utils/prisma.js';

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const err = new Error('User not found') as Error & { status?: number };
    err.status = 404;
    throw err;
  }
  const { passwordHash: _ph, ...rest } = user;
  return rest;
}

export async function updateProfile(userId: string, data: { name: string; avatarUrl?: string }) {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });
  const { passwordHash: _ph, ...rest } = user;
  return rest;
}
