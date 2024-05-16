import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const data = await sql`SELECT * FROM header`
    const rowData = data.rows[0]
    return NextResponse.json({ rowData })
  } catch (err) {
    console.error('Fetching Error:', err)
    return new NextResponse(JSON.stringify({ error: 'Internal Fetching Error'}), { status: 500 })
  }
}


export async function PUT(req: NextRequest, res: NextResponse) {

  // UPDATE ${section}
  // SET ${area} = ${input}
  // WHERE ${area} = ${currentData}
  // RETURNING *;


  try {
    const body = await req.json()
    const { header, statement } = body
    
    console.log(header, statement)

    return new NextResponse(JSON.stringify({ message: "Data processed" }), { status: 200 })
  } catch (err) {
    console.error('Error parsing JSON or processing data:', err);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// console.log(req.nextUrl.searchParams.get('test'))