import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const maxResults = 10
  const path = new URL(req.url)
  const folder = path.searchParams.get('path') || 'main-images'
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=${folder}`
 
  try {
    const resData = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      },
    })

    if (!resData.ok) {
      return new NextResponse(JSON.stringify({ error: 'Fetch Failure' }), { status: resData.status });
    }

    const data = await resData.json()

    const resource = data.resources
    return new NextResponse(JSON.stringify({ data: resource }), { status: 200 });
    
  } catch (err: any) {
    console.error("Fetch Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Error', message: err.message }), { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=${folder}`
 
  try {
    
    return new NextResponse(JSON.stringify({ data: 'success' }), { status: 200 });
  } catch (err: any) {
    console.error("Fetch Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Error', message: err.message }), { status: 500 });
  }
}