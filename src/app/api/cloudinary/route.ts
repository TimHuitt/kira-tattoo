import { NextRequest, NextResponse } from 'next/server';
var cloudinary = require('cloudinary').v2


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const result = await cloudinary.uploader.upload(body.image, {upload_preset: 'profile', public_id: 'profile-image'})
    
    return new NextResponse(JSON.stringify({ data: 'result' }), { status: 200 });
  } catch (err: any) {
    console.error("Fetch Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Error', message: err.message }), { status: 500 });
  }
}