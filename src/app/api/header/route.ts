import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getServerSession } from 'next-auth';
import { options } from '@/app/lib/auth'


// add each content add section via search param
// 

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // const name = req.query.name || ''
  // const number = req.query.number || ''

  const session = await getServerSession(options)
  console.log(session)

  try {
    const data = await sql`SELECT * FROM header`
    const rowData = data.rows[0]
    console.log(rowData)
    return NextResponse.json({ rowData })
  } catch (err) {
    console.error('Fetching Error:', err)
    return new NextResponse(JSON.stringify({ error: 'Internal Fetching Error'}), { status: 500 })
  }
 
  // try {
  //   if (!name || !number) throw new Error('Name and Number required');
  //   const parsedNum = parseInt(number)
  //   if (isNaN(parsedNum)) throw new Error('Number must be a valid integer');
  //   await sql`INSERT INTO test (name, number) VALUES (${name}, ${parsedNum});`;
  // } catch (error) {
  //   return NextResponse.json({ error }, { status: 500 });
  // }
//  
//   const test = await sql`SELECT * FROM test;`;
//   return NextResponse.json({ test }, { status: 200 });
}