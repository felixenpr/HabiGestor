import { NextResponse } from 'next/server'
import { getDepartments, createDepartment } from '@/modules/models/Department'

export async function GET() {
  try {
    const data = await getDepartments()
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/department error:', err)
    return new NextResponse('error', { status: 500 })
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const saved = await createDepartment(body)
    return NextResponse.json(saved, { status: 201 })
  } catch (err) {
    console.error('POST /api/department error:', err)
    return new NextResponse('error', { status: 500 })
  }
}
