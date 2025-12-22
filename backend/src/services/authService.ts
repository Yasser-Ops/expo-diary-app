import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../utils/prisma.js';

const withStatus = (message: string, status: number) => {
  const err = new Error(message) as Error & { status?: number };
  err.status = status;
  return err;
};

const publicUser = (user: { id: string; email: string; name: string; avatarUrl: string | null }) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarUrl: user.avatarUrl ?? undefined,
});

const signToken = (user: { id: string; email: string }) =>
  jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, { expiresIn: '7d' });

export async function registerUser(email: string, password: string, name: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw withStatus('Email already registered', 409);
  }

  const passwordHash = await bcrypt.hash(password, env.bcryptSaltRounds);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  return { token: signToken(user), user: publicUser(user) };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw withStatus('Invalid credentials', 401);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw withStatus('Invalid credentials', 401);
  }

  return { token: signToken(user), user: publicUser(user) };
}
