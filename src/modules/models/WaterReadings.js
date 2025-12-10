import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { getInvoicesByDepartment, createInvoice } from './Invoice'

const COLLECTION = 'water_readings'

export async function getReadingsByDepartment(departmentId) {
  const client = await clientPromise
  return client
    .db('habigestor')
    .collection(COLLECTION)
    .find({ departmentId })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getLatestReading(departmentId) {
  const client = await clientPromise
  const arr = await client
    .db('habigestor')
    .collection(COLLECTION)
    .find({ departmentId })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray()
  return (arr && arr[0]) || null
}

export async function createReading({ departmentId, lecturaActual, mes }) {
  const client = await clientPromise

  // traer última lectura
  const last = await getLatestReading(departmentId)
  const lecturaAnterior = last ? Number(last.lecturaActual) : 0
  const lecturaActualNum = Number(lecturaActual)

  const consumo = lecturaActualNum - lecturaAnterior
  const now = new Date()

  const readingDoc = {
    departmentId,
    lecturaAnterior,
    lecturaActual: lecturaActualNum,
    consumo: consumo < 0 ? 0 : consumo,
    mes: mes || new Date().toISOString().slice(0, 7),
    createdAt: now,
  }

  const r = await client
    .db('habigestor')
    .collection(COLLECTION)
    .insertOne(readingDoc)
  readingDoc._id = r.insertedId

  // crear factura basada en esta lectura
  const invoice = await createInvoice({
    departmentId,
    lecturaAnterior,
    lecturaActual: lecturaActualNum,
    mes: readingDoc.mes,
  })

  // opcional: guardar referencia de invoice en reading
  await client
    .db('habigestor')
    .collection(COLLECTION)
    .updateOne({ _id: readingDoc._id }, { $set: { invoiceId: invoice._id } })

  return { reading: readingDoc, invoice }
}
