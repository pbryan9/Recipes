import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/db/getAllUsers';
import { createNewUser } from '@/lib/db/createNewUser';

export async function GET() {
  const allUsers = await getAllUsers();

  return NextResponse.json(allUsers);
}

export async function POST(req: Request) {
  // TODO: how do I detect & deal with lack of input?
  const { username }: { username: string } = await req.json();

  if (!username) return NextResponse.json({ error: 'No username provided' });

  const newUser = await createNewUser({ username });

  return NextResponse.json(newUser);
}
