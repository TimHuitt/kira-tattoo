import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function GET(req: NextRequest) {
  // const name = req.query.name || ''
  // const number = req.query.number || ''


  try {
    const data = await sql`SELECT * FROM header`
    const rowData = data.rows[0]
    return NextResponse.json({ rowData })
  } catch (err) {
    console.error('Fetching Error:', err)
    return new NextResponse(JSON.stringify({ error: 'Internal Fetching Error'}), { status: 500 })
  }

}