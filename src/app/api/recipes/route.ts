import { getAllRecipes } from '@/lib/db/recipes/getRecipes';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(await getAllRecipes());
}
