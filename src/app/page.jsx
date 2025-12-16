import HomeClient from '@/app/HomeCliente'

export default async function Home() {
  // Fetch en el servidor (mejor performance)
  const buildings = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/buildings`,
    {
      cache: 'no-store',
    }
  ).then((r) => r.json())

  const departments = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/departments`,
    {
      cache: 'no-store',
    }
  ).then((r) => r.json())

  const settings = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/settings`, {
    cache: 'no-store',
  }).then((r) => r.json())

  return (
    <HomeClient
      buildings={buildings}
      departments={departments}
      settings={settings}
    />
  )
}
