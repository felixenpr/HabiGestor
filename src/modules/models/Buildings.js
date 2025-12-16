import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const COLLECTION = 'buildings'

export async function getBuildings(filter = {}) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .find(filter)
    .toArray()
}

export async function getBuildingById(id) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  return client.db(process.env.DB_NAME).collection(COLLECTION).findOne(q)
}

export async function createBuilding(data) {
  const client = await clientPromise
  const now = new Date()
  const doc = {
    name: data.name || '',
    address: data.address || '',
    createdAt: now,
    updatedAt: now,
  }
  const res = await client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .insertOne(doc)
  doc._id = res.insertedId
  return doc
}

export async function updateBuilding(id, update) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  await client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .updateOne(q, { $set: { ...update, updatedAt: new Date() } })
  return getDepartmentById(q)
}

export async function deleteBuilding(id) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  return client.db(process.env.DB_NAME).collection(COLLECTION).deleteOne(q)
}
