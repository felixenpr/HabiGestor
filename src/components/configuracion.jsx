'use client'

import { useState } from 'react'
import { Save, Droplets, Zap, Building, Trash2, Percent } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRatesSettings } from '@/hooks/useRatesSettings'

export function Configuracion({ settings, buildings }) {
  const [saved, setSaved] = useState(false)

  const { data, updateRate, updateMaintenance } = useRatesSettings(
    settings,
    buildings
  )
  const { waterRate, electricityRate, sewerRate, taxRate, maintenanceRates } =
    data

  const handleSave = async () => {
    const payload = {
      type: 'rates',
      waterRate: data.waterRate,
      electricityRate: data.electricityRate,
      sewerRate: data.sewerRate,
      taxRate: data.taxRate,
      maintenance: data.maintenanceRates.map((m) => ({
        buildingId: m.buildingId,
        value: m.amount,
      })),
    }

    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const rateCards = [
    {
      key: 'waterRate',
      title: 'Tarifa de Agua',
      description: 'Costo por metro cúbico (m³)',
      icon: Droplets,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
      unit: '/ m³',
      currency: 'S/',
      value: waterRate,
    },
    {
      key: 'sewerRate',
      title: 'Tarifa de Alcantarillado',
      description: 'Costo por metro cúbico (m³)',
      icon: Trash2,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
      unit: '/ m³',
      currency: 'S/',
      value: sewerRate,
    },
    {
      key: 'electricityRate',
      title: 'Tarifa de Electricidad',
      description: 'Costo por kilovatio hora (kWh)',
      icon: Zap,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
      unit: '/ kWh',
      currency: 'S/',
      value: electricityRate,
    },
    ,
    {
      key: 'taxRate',
      title: 'Tarifa de Impuestos',
      description: 'Costo adicional en porcentaje (%)',
      icon: Percent,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
      unit: '%',
      currency: '',
      value: taxRate,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">
          Configuración de Tarifas
        </h1>
        <p className="text-muted-foreground mt-1">
          Administra las tarifas y cargos fijos del condominio
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">
          Tarifas Variables
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rateCards.map((rate) => {
            const Icon = rate.icon
            return (
              <Card key={rate.key} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${rate.bgColor} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${rate.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">
                        {rate.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {rate.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {rate.currency}
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          value={rate.value}
                          onChange={(e) => updateRate(rate.key, e.target.value)}
                          className="w-32 rounded-xl"
                        />
                        <span className="text-sm text-muted-foreground">
                          {rate.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Fixed Charges */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">
          Cargos por Mantenimiento Fijo
        </h2>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {maintenanceRates.map((charge) => {
                const Icon = Building
                return (
                  <div
                    key={charge.buildingId}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {charge.buildingName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">S/</span>
                      <Input
                        type="number"
                        step="0.01"
                        value={charge.amount}
                        onChange={(e) =>
                          updateMaintenance(charge.buildingId, e.target.value)
                        }
                        className="w-24 rounded-lg"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="rounded-xl px-8">
          <Save className="w-4 h-4 mr-2" />
          {saved ? '¡Guardado!' : 'Guardar Cambios'}
        </Button>
      </div>
    </div>
  )
}
