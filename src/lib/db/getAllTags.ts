import prisma from '.';

export async function getAllTags() {
  const tags = await prisma.tag.findMany();

  return tags;
}
