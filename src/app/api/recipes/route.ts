import { getAllRecipes } from '@/lib/db/recipes/getAllRecipes';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(await getAllRecipes());
}
