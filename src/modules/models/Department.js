import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const COLLECTION = 'departments'

export async function getDepartments(filter = {}) {
  const client = await clientPromise
  return client.db('habigestor').collection(COLLECTION).find(filter).toArray()
}

export async function getDepartmentById(id) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  return client.db('habigestor').collection(COLLECTION).findOne(q)
}

export async function createDepartment(data) {
  const client = await clientPromise
  const now = new Date()
  const doc = {
    name: data.name || '',
    floor: data.floor || '',
    tenant: data.tenant || '',
    createdAt: now,
    updatedAt: now,
  }
  const res = await client
    .db('habigestor')
    .collection(COLLECTION)
    .insertOne(doc)
  doc._id = res.insertedId
  return doc
}

export async function updateDepartment(id, update) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  await client
    .db('habigestor')
    .collection(COLLECTION)
    .updateOne(q, { $set: { ...update, updatedAt: new Date() } })
  return getDepartmentById(q)
}

export async function deleteDepartment(id) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  return client.db('habigestor').collection(COLLECTION).deleteOne(q)
}
