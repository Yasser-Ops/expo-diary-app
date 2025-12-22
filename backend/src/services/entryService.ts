import { prisma } from '../utils/prisma.js';

const notFound = () => {
  const err = new Error('Entry not found') as Error & { status?: number };
  err.status = 404;
  return err;
};

export async function listEntries(userId: string) {
  return prisma.entry.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createEntry(
  userId: string,
  data: { title: string; body?: string; tags?: string[]; mood?: string; location?: string }
) {
  return prisma.entry.create({
    data: { ...data, userId, tags: data.tags ?? [] },
  });
}

export async function getEntry(userId: string, id: string) {
  const entry = await prisma.entry.findFirst({ where: { id, userId } });
  if (!entry) throw notFound();
  return entry;
}

export async function updateEntry(
  userId: string,
  id: string,
  data: Partial<{ title: string; body?: string; tags?: string[]; mood?: string; location?: string }>
) {
  await getEntry(userId, id);
  return prisma.entry.update({
    where: { id },
    data,
  });
}

export async function deleteEntry(userId: string, id: string) {
  await getEntry(userId, id);
  await prisma.entry.delete({ where: { id } });
}
