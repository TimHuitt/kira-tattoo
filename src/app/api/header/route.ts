import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function GET(req: NextApiRequest, res: NextApiResponse) {
  // const name = req.query.name || ''
  // const number = req.query.number || ''


  try {
    const data = await sql`SELECT * FROM header`
    const rowData = data.rows[0]
    console.log(rowData)
    return NextResponse.json({ rowData })
  } catch (err) {
    console.error('Fetching Error:', err)
    return new NextResponse(JSON.stringify({ error: 'Internal Fetching Error'}), { status: 500 })
  }

}