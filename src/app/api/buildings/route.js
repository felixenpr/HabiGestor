import { NextResponse } from 'next/server'
import { getBuildings, createBuilding } from '@/modules/models/Buildings'

export async function GET() {
  try {
    const data = await getBuildings()
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/buildings error:', err)
    return new NextResponse('error', { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const saved = await createBuilding(body)
    return NextResponse.json(saved, { status: 201 })
  } catch (err) {
    console.error('POST /api/buildings error:', err)
    return new NextResponse('error', { status: 500 })
  }
}
