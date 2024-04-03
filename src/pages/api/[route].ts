import { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk'
import { ListObjectsV2Request } from 'aws-sdk/clients/s3';
import { ListObjectsV2Output } from 'aws-sdk/clients/s3';

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

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const folder = req.query.path || 'main-images';
  const maxResults = 10; // Adjust as necessary
  const bucketName: string = process.env.AWS_S3_BUCKET_NAME || ''

  const params: ListObjectsV2Request = {
    Bucket: bucketName,
    Prefix: folder + '/',
    MaxKeys: maxResults,
  };

  try {
    const data: ListObjectsV2Output = await s3.listObjectsV2(params).promise();
    const resources = data.Contents?.map((file: S3.Object) => {
      return { 
        key: file.Key, 
        url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}` };
    });

    res.status(200).json({ data: resources });
  } catch (err) {
    console.error("S3 Fetch Error:", err);
    res.status(500).json({ error: 'Error', message: err.message });
  }
}