export async function GET() {
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`
  
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      },
    })

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Fetch Failure'}), {
        status: res.status,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const product = await res.json()
  
    return new Response(JSON.stringify({ product }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.error("Fetch Error:", err)
    return new Response(JSON.stringify({ error: 'Error'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}