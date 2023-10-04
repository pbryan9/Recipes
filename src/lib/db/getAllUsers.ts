import prisma from '.';

export async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}
