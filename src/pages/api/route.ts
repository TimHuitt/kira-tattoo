import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      // await handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const maxResults = 10
  const folder = "main-images"
  const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=${folder}`
  
  try {
    const resData = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')}`
      },
    })

    if (!resData.ok) {
      return res.status(resData.status).json({ error: 'Fetch Failure' });
    }

    const data = await resData.json()
    const resource = data.resources
    return res.status(200).json({ data: resource })
    
  } catch (err: any) {
    console.error("Fetch Error:", err)
    return res.status(500).json({ error: 'Error', message: err.message })
  }
}