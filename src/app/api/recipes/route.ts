import { getAllRecipes } from '@/lib/db/recipes/getAllRecipes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname;

  console.log('path:', path);

  return NextResponse.json(await getAllRecipes());
}
