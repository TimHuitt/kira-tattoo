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
    const current = body.currentData

    const result = await sql`UPDATE ${section} SET ${area} = ${input};`


//     const result = await sql`
//       UPDATE header
//       SET header = 'test';
//     `
// 

    console.log(result)
    
    // if (result) {
    //   console.log(result)
    //   // return new NextResponse(JSON.stringify({ message: result }), { status: 200 })
    //   // return new NextResponse(JSON.stringify({ message: "Data processed" }), { status: 200 })
    // } else {
    //   throw new Error('Parameter is not a number!');
    // }


  } catch (err) {
    console.error('Error parsing JSON or processing data:', err);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// console.log(req.nextUrl.searchParams.get('test'))