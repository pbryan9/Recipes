import { PrismaClient } from '@prisma/client';
import z from 'zod';

const prisma = new PrismaClient();

const zCreateUser = z.object({
  username: z.string().min(5).max(20),
});

type CreateUserParams = z.infer<typeof zCreateUser>;

export async function createNewUser(params: CreateUserParams) {
  const { username } = zCreateUser.parse(params);

  const newUser = await prisma.user.create({ data: { username } });

  return newUser;
}
