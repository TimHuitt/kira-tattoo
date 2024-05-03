import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const config = {
  runtime: 'edge'
}

export default async function GET(request: Request) {
  const url = new URL(request.url, 'http://dummyurl');
  const searchParams = url.searchParams
  const name = searchParams.get('name')
  const number = searchParams.get('number')
 
  try {
    if (!name || !number) throw new Error('Name and Number required');
    const parsedNum = parseInt(number)
    if (isNaN(parsedNum)) throw new Error('Number must be a valid integer');
    await sql`INSERT INTO test (name, number) VALUES (${name}, ${parsedNum});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const test = await sql`SELECT * FROM test;`;
  return NextResponse.json({ test }, { status: 200 });
}