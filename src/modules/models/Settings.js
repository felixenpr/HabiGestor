import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const COLLECTION = 'settings'

export async function getSettings() {
  const client = await clientPromise
  return client.db(process.env.DB_NAME).collection(COLLECTION).findOne({})
}

export async function updateSettings(update) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  await client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .updateOne(q, { $set: { ...update, updatedAt: new Date() } })
  return getSettings()
}
