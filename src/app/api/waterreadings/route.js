import { NextResponse } from 'next/server'
import {
  getReadingsByDepartment,
  createReading,
  getLatestReading,
} from '@/modules/models/WaterReadings'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const departmentId = searchParams.get('departmentId')
    if (!departmentId)
      return new NextResponse('departmentId missing', { status: 400 })

    const data = await getReadingsByDepartment(departmentId)
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/waterreadings error:', err)
    return new NextResponse('error', { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    // espere body: { departmentId, lecturaActual, mes? }
    const { departmentId, lecturaActual, mes } = body
    if (
      !departmentId ||
      lecturaActual === undefined ||
      lecturaActual === null
    ) {
      return new NextResponse('departmentId or lecturaActual missing', {
        status: 400,
      })
    }

    const result = await createReading({ departmentId, lecturaActual, mes })
    // devuelve lectura guardada + la factura generada
    return NextResponse.json(result, { status: 201 })
  } catch (err) {
    console.error('POST /api/waterreadings error:', err)
    return new NextResponse('error', { status: 500 })
  }
}
