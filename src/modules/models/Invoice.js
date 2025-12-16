import clientPromise from '@/lib/mongodb'
import { calculateWaterSewerCost } from '../services/Tariff'
import { ObjectId } from 'mongodb'

const COLLECTION = 'invoices'

export async function createInvoice({ data }) {
  const doc = {
    invoiceNumber: `BS-${Date.now()}`,
    buildingId: new ObjectId(data.buildingId),
    departmentId: new ObjectId(data.departmentId),
    lecturaAnterior: Number(lecturaAnterior),
    lecturaActual: Number(lecturaActual),
    consumo: consumoClean,
    items: [
      {
        description: data.water.name,
        amount: calculateWaterSewerCost(),
        actualreading: Number(data.water.actualReading),
        previousreading: Number(data.water.previousReading),
        consumption: Number(data.water.consumption),
      },
      {
        description: data.electricity.name,
        amount: calculateElectricityCost(),
        actualreading: Number(data.electricity.actualReading),
        previousreading: Number(data.electricity.previousReading),
        consumption: Number(data.electricity.consumption),
      },
      {
        description: data.mantainance.name,
        amount: Number(data.mantainance.amount),
      },
    ],
    subtotal: data.subtotal,
    total: data.total,
    month: data.month || new Date().toISOString().slice(0, 7),
    status: 'pending',
    dueDate: data.dueDate ? new Date(data.dueDate) : null,
    notes: data.notes || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const client = await clientPromise
  const res = await client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .insertOne(doc)
  doc._id = res.insertedId
  return doc
}

export async function getInvoices(filter = {}) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .find(filter)
    .toArray()
}

export async function getInvoicesByDepartment(departmentId) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .find({ departmentId: new ObjectId(departmentId) })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getInvoiceById(id) {
  const client = await clientPromise
  return client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .findOne({ _id: new ObjectId(id) })
}

export async function updateInvoice(id, update) {
  const client = await clientPromise
  const q = typeof id === 'string' ? { _id: new ObjectId(id) } : id
  await client
    .db(process.env.DB_NAME)
    .collection(COLLECTION)
    .updateOne(q, { $set: { ...update, updatedAt: new Date() } })
  return getInvoiceById(q)
}
