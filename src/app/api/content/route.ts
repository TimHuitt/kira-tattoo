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

  try {
    const body = await req.json()
    const section = body.section
    const area = body.area
    const input = body.input
    const query = `UPDATE ${section} SET ${area} = $1`

    const result = await sql.query(query, [input])


    if (result.rowCount > 0) {
      return new NextResponse(JSON.stringify({ message: result }), { status: 200 })
    } else {
      throw new Error('Error Updating Database')
    }


  } catch (err) {
    console.error('Error parsing JSON or processing data:', err);
    return new NextResponse(JSON.stringify({ error: err }), { status: 500 });
  }
}

// console.log(req.nextUrl.searchParams.get('test'))