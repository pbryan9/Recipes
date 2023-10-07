import { getAllTags } from '@/lib/db/getAllTags';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(await getAllTags());
}
