import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

const COLLECTION = 'payments'

export async function createPayment({ data }) {
  const doc = {
    paymentNumber: `PMT-${Date.now()}`,
    invoiceId: new ObjectId(data.invoiceId),
    departmentId: new ObjectId(data.departmentId),
    buildingId: new ObjectId(data.buildingId),
    date: data.date ? new Date(data.date) : new Date(),
    amount: Number(data.amount),
    method: data.method || 'unknown',
    notes: data.notes || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const client = await clientPromise
  const res = await client
    .db('habigestor')
    .collection(COLLECTION)
    .insertOne(doc)
  doc._id = res.insertedId
  return doc
}

export async function getPayments(filter = {}) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .find(filter)
    .toArray()
}

export async function getPaymentsByInvoice(invoiceId) {
  const client = await clientPromise
  const q =
    typeof invoiceId === 'string'
      ? { invoiceId: new ObjectId(invoiceId) }
      : { invoiceId }
  return client.db(process.env.DB_NAME).collection(COLLECTION).findOne(q)
}

export async function getPaymentsByDepartment(departmentId) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .find({ departmentId: new ObjectId(departmentId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getPaymentsByBuilding(buildingId) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .find({ buildingId: new ObjectId(buildingId) })
    .sort({ createdAt: -1 })
    .toArray()
}
