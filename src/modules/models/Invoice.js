import clientPromise from '@/lib/mongodb'
import { calculateWaterSewerCost } from './Tariff'
import { calculateFixedAndIgv } from './FixedCharge'
import { ObjectId } from 'mongodb'

const COLLECTION = 'invoices'

export async function createInvoice({
  departmentId,
  lecturaAnterior = 0,
  lecturaActual = 0,
  mes,
}) {
  const consumo = Number(lecturaActual) - Number(lecturaAnterior)
  const consumoClean = consumo < 0 ? 0 : consumo

  // costo agua + saneamiento
  const waterCalc = calculateWaterSewerCost(consumoClean)

  // aplicar cargo fijo e IGV
  const { fixed, subtotal, igv, total } = calculateFixedAndIgv(
    waterCalc.subtotal
  )

  const invoiceDoc = {
    departmentId,
    lecturaAnterior: Number(lecturaAnterior),
    lecturaActual: Number(lecturaActual),
    consumo: consumoClean,
    waterBreakdown: {
      totalAgua: waterCalc.totalAgua,
      totalSaneamiento: waterCalc.totalSaneamiento,
      subtotalWaterSewer: waterCalc.subtotal,
      detallePorTramo: waterCalc.detallePorTramo,
    },
    fixedCharge: fixed,
    subtotal: subtotal,
    igv: igv,
    total: total,
    mes: mes || new Date().toISOString().slice(0, 7),
    createdAt: new Date(),
  }

  const client = await clientPromise
  const res = await client
    .db('habigestor')
    .collection(COLLECTION)
    .insertOne(invoiceDoc)
  invoiceDoc._id = res.insertedId
  return invoiceDoc
}

export async function getInvoicesByDepartment(departmentId) {
  const client = await clientPromise
  return client
    .db('habigestor')
    .collection(COLLECTION)
    .find({ departmentId })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getInvoiceById(id) {
  const client = await clientPromise
  return client
    .db('habigestor')
    .collection(COLLECTION)
    .findOne({ _id: new ObjectId(id) })
}
