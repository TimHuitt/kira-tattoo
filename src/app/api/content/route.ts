import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(req: NextRequest) {
  const path = new URL(req.url)
  const table = path.searchParams.get('table') || ''

  try {

    if (table === 'header') {
      const data = await sql`SELECT * FROM header`
      const rowData = data.rows[0]
      return NextResponse.json({ rowData })
    } else if (table === 'posts') {
      const data = await sql`SELECT * FROM posts`
      return NextResponse.json(data.rows)
    } else {
      throw new Error('incorrect table')
    }
    
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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const query = `INSERT INTO posts (title, header, content, id, date) VALUES ($1, $2, $3, $4, $5)`
    const values = [body.title, body.header, body.content, body.id, body.date]
    const result = await sql.query(query, values)

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

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const query = `DELETE FROM posts WHERE id = $1`
    const result = await sql.query(query, [body.id])

    if (result.rowCount > 0) {
      return new NextResponse(JSON.stringify({ message: result }), { status: 200 })
    } else {
      throw new Error('Error Updating Database')
    }
  } catch (err) {
    console.error('Error Deleting Post:', err);
    return new NextResponse(JSON.stringify({ error: err }), { status: 500 });
  }
}