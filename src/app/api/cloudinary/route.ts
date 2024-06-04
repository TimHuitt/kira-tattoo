import { NextRequest, NextResponse } from 'next/server'
var cloudinary = require('cloudinary').v2


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})


export async function GET(req: NextRequest) {
  // const maxResults = 10
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
      return new NextResponse(JSON.stringify({ error: 'Fetch Failure' }), { status: resData.status })
    }

    const data = await resData.json()
    const resource = data.resources
    return new NextResponse(JSON.stringify({ data: resource }), { status: 200 })
    
  } catch (err: any) {
    console.error("Fetch Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Fetch Error', message: err.message }), { status: 500 })
  }
}

// upload new image(s)
// required 'preset'
// optional 'id'

export async function POST(req: NextRequest, res: NextResponse) {
  let result: any

  try {
    const body = await req.json()

    interface DataTypes {
      upload_preset: string
      public_id?: string | undefined
      folder?: string | undefined
    }

    const data: DataTypes = {
      upload_preset: body.preset,
    }

    if (body.preset === 'profile') {
      data.public_id = 'profile-image'
    }

    if (body.preset === 'posts') {
      data.folder = `main-images/posts/${body.folder}`
    }

    // if body.folder !== '', then create a new folder using body.folder uid
    if (body.folder === '') {
      result = await cloudinary.uploader.upload(body.image, data)
    } else {
      const createResult = await cloudinary.api.create_folder(`main-images/posts/${body.folder}`)
      if (createResult.success) {
        result = await cloudinary.uploader.upload(body.image, data)
      }
    }


    return new NextResponse(JSON.stringify({ data: 'result' }), { status: 200 })
  } catch (err: any) {
    console.error("Post Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Post Error', message: err.message }), { status: 500 })
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const path = new URL(req.url)
    const file = path.searchParams.get('file')
    const folder = path.searchParams.get('folder')
    let result

    if (folder) {
      result = await cloudinary.api.delete_resources_by_prefix(`main-images/posts/${folder}`)
      result = await cloudinary.api.delete_folder(`main-images/posts/${folder}`)
    } else {
      result = await cloudinary.uploader.destroy(file, {invalidate: true})
    }

    return new NextResponse(JSON.stringify({ data: result }), { status: 200 })
  } catch (err: any) {
    console.error("Delete Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Delete Error', message: err.message }), { status: 500 })
  }
}