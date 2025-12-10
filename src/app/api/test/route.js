import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('habigestor')
    const data = await db.collection('test').find({}).toArray()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response('error', { status: 500 })
  }
}
