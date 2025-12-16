import { NextResponse } from 'next/server'
import { getSettings } from '@/modules/models/Settings'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const data = await getSettings()
    return NextResponse.json(data)
  } catch (err) {
    console.error('GET /api/settings error:', err)
    return new NextResponse('error', { status: 500 })
  }
}

export async function PUT(req) {
  const data = await req.json()
  const client = await clientPromise

  await client
    .db(process.env.DB_NAME)
    .collection('settings')
    .updateOne({ type: 'rates' }, { $set: { ...data, updatedAt: new Date() } })

  return Response.json({ ok: true })
}
