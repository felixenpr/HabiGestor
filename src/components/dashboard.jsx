'use client'

import { useDashboardData } from '@/hooks/useDashboardData'
import { Bell, Droplets, Zap, Wallet, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export function Dashboard({
  buildings,
  departments,
  selectedBuilding,
  setSelectedBuilding,
}) {
  const { filtered, totalDebt, totalWater, totalElectricity, debtors } =
    useDashboardData(departments, selectedBuilding)

  const recentActivity = [
    {
      id: 1,
      type: 'payment',
      message: 'Pago recibido - Dpto 102 - S/ 300.00',
      time: 'Hace 2 horas',
    },
    {
      id: 2,
      type: 'reading',
      message: 'Lectura de agua registrada - Dpto 201',
      time: 'Hace 4 horas',
    },
    {
      id: 3,
      type: 'debt',
      message: 'Nueva deuda generada - Dpto 301',
      time: 'Hace 1 día',
    },
    {
      id: 4,
      type: 'receipt',
      message: 'Recibo emitido - Dpto 102',
      time: 'Hace 1 día',
    },
    {
      id: 5,
      type: 'payment',
      message: 'Pago recibido - Dpto 302 - S/ 450.00',
      time: 'Hace 2 días',
    },
  ]

  // Mock for demostration porpuse.
  const monthlyData = [
    { month: 'Jul', ingresos: 8500, gastos: 6200 },
    { month: 'Ago', ingresos: 9200, gastos: 5800 },
    { month: 'Sep', ingresos: 7800, gastos: 6500 },
    { month: 'Oct', ingresos: 10500, gastos: 7200 },
    { month: 'Nov', ingresos: 9800, gastos: 6800 },
    { month: 'Dic', ingresos: 11200, gastos: 7500 },
  ]

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          Bienvenido, Administrador
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          Panel de administración de condominios
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
        <div className="flex-1 relative">
          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="w-full appearance-none bg-card border border-border rounded-xl px-3 md:px-4 py-2 md:py-2.5 pr-10 text-xs md:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">Todos los edificios</option>
            {buildings.map((building) => (
              <option key={building._id} value={building._id}>
                {building.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-xl bg-transparent h-9 w-9 md:h-10 md:w-10"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">
                  Total Deudas
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-foreground truncate">
                  S/ {totalDebt}
                </p>
                <p className="text-xs text-muted-foreground mt-1 md:mt-2">
                  {debtors.length} dpto con deuda
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Wallet className="w-5 h-5 md:w-7 md:h-7 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">
                  Agua
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-foreground truncate">
                  {totalWater} m³
                </p>
                <p className="text-xs text-muted-foreground mt-1 md:mt-2">
                  {filtered.length} dptos
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                <Droplets className="w-5 h-5 md:w-7 md:h-7 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-muted-foreground mb-1">
                  Electricidad
                </p>
                <p className="text-2xl md:text-3xl font-semibold text-foreground truncate">
                  {totalElectricity} kWh
                </p>
                <p className="text-xs text-muted-foreground mt-1 md:mt-2">
                  {filtered.length} dptos
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 md:w-7 md:h-7 text-chart-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart and Debtors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-sm md:text-lg font-medium">
              Resumen Mensual
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData} barGap={8}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                  tickFormatter={(value) => `S/${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                  formatter={(value) => [`S/ ${value.toFixed(2)}`, '']}
                  cursor={false}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="ingresos"
                  fill="var(--chart-2)"
                  radius={[6, 6, 0, 0]}
                  name="Ingresos"
                />
                <Bar
                  dataKey="gastos"
                  fill="var(--chart-1)"
                  radius={[6, 6, 0, 0]}
                  name="Gastos"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="p-4 md:p-6 flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-sm md:text-lg font-medium">
              Deudores Recientes
            </CardTitle>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full whitespace-nowrap">
              {debtors.length} total
            </span>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <div className="space-y-2 md:space-y-4">
              {debtors.slice(0, 4).map((debtor) => (
                <div
                  key={debtor._id}
                  className="flex items-center justify-between gap-3 p-2 md:p-3 rounded-xl bg-muted/50"
                >
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs md:text-sm font-medium text-primary flex-shrink-0">
                      {debtor.number}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs md:text-sm font-medium text-foreground truncate">
                        {debtor.owner}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {debtor.monthsOverdue} meses
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs md:text-sm font-semibold text-destructive">
                      S/ {Number(debtor.debt['$numberDecimal'].toString())}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm bg-card">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-sm md:text-lg font-medium">
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="space-y-2 md:space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    activity.type === 'payment'
                      ? 'bg-chart-2'
                      : activity.type === 'reading'
                        ? 'bg-chart-4'
                        : activity.type === 'debt'
                          ? 'bg-destructive'
                          : 'bg-primary'
                  }`}
                />
                <p className="text-xs md:text-sm text-foreground flex-1 min-w-0">
                  <span className="hidden sm:inline">{activity.message}</span>
                  <span className="sm:hidden">
                    {activity.message.split(' - ')[0]}
                  </span>
                </p>
                <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
