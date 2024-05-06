import { MongoClient } from 'mongodb'
import { hash } from 'bcryptjs'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(500).json({ message: 'Invalid Route'})
    return
  }
  const { email, password } = req.body
  
  if (!email || !email.include(@) || !password) {
    res.status(422).json({ message: 'Please complete all sections'})
    return
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db()

  const checkExisting = await db.collection('users').findOne({ email: email })

  if (checkExisting) {
    res.status(422).json({ message: 'User Exists'})
    client.close()
    return
  }

  const status = await db.collection('users').insertOne({
    email,
    password: await hash(password, 12),
  })

  res.status(201).json({ message: 'User created', ...status })
  client.close()
}

export default handler