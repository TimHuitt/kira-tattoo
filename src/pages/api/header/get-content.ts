import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export default async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await GET(req, res);
      break;
    case 'POST':
      // await handlePost(req, res);
      break;
    default:
      return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
  }
}

// add each content add section via search param
// 

async function GET(req: NextApiRequest, res: NextApiResponse) {
  // const name = req.query.name || ''
  // const number = req.query.number || ''

  try {
    const data = await sql`SELECT * FROM header`
    const rowData = data.rows[0]
    console.log(rowData)
    res.status(200).json({ data: rowData })
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