import { createNewRecipe } from '@/lib/db/recipes/createNewRecipe';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const res = await req.json();

  console.log('req body:', res);

  const createRecipe = await createNewRecipe(res);

  return Response.json({ createRecipe });
}
