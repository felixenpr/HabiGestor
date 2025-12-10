"use client"

import { useState } from "react"
import { FileText, Droplets, Zap, Home, Printer, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { departments, buildings, defaultRates } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Recibos({ selectedBuilding }) {
  const [selectedDept, setSelectedDept] = useState("")
  const [receiptType, setReceiptType] = useState("")
  const [previewReceipt, setPreviewReceipt] = useState(null)

  const filteredDepts = departments.filter((d) => d.building === selectedBuilding)
  const buildingName = buildings.find((b) => b.id === selectedBuilding)?.name

  const receiptTypes = [
    { id: "water", name: "Agua", icon: Droplets, color: "text-chart-2" },
    { id: "electricity", name: "Electricidad", icon: Zap, color: "text-chart-4" },
    { id: "maintenance", name: "Mantenimiento", icon: Home, color: "text-primary" },
  ]

  const generateReceipt = () => {
    const dept = filteredDepts.find((d) => d.id.toString() === selectedDept)
    if (!dept || !receiptType) return

    let amount = 0
    let details = []

    switch (receiptType) {
      case "water":
        const waterConsumption = 15
        amount = waterConsumption * defaultRates.waterRate
        details = [
          { label: "Consumo", value: `${waterConsumption} m³` },
          { label: "Tarifa", value: `S/ ${defaultRates.waterRate.toFixed(2)}/m³` },
        ]
        break
      case "electricity":
        const elecConsumption = 120
        amount = elecConsumption * defaultRates.electricityRate
        details = [
          { label: "Consumo", value: `${elecConsumption} kWh` },
          { label: "Tarifa", value: `S/ ${defaultRates.electricityRate.toFixed(2)}/kWh` },
        ]
        break
      case "maintenance":
        amount = defaultRates.maintenance + defaultRates.cleaning + defaultRates.security + defaultRates.commonAreas
        details = [
          { label: "Mantenimiento", value: `S/ ${defaultRates.maintenance.toFixed(2)}` },
          { label: "Limpieza", value: `S/ ${defaultRates.cleaning.toFixed(2)}` },
          { label: "Seguridad", value: `S/ ${defaultRates.security.toFixed(2)}` },
          { label: "Áreas Comunes", value: `S/ ${defaultRates.commonAreas.toFixed(2)}` },
        ]
        break
    }

    setPreviewReceipt({
      type: receiptType,
      typeName: receiptTypes.find((t) => t.id === receiptType)?.name,
      building: buildingName,
      department: dept.number,
      tenant: dept.tenant,
      owner: dept.owner,
      month: new Date().toLocaleDateString("es-PE", { month: "long", year: "numeric" }),
      date: new Date().toLocaleDateString("es-PE"),
      details,
      amount,
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Generador de Recibos</h1>
        <p className="text-muted-foreground mt-1">{buildingName}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Receipt Generator */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Crear Nuevo Recibo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Departamento</label>
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Seleccionar departamento" />
                </SelectTrigger>
                <SelectContent>
                  {filteredDepts.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      Dpto {dept.number} - {dept.tenant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Tipo de Recibo</label>
              <div className="grid grid-cols-3 gap-3">
                {receiptTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setReceiptType(type.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        receiptType === type.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${type.color}`} />
                      <p className="text-sm font-medium text-foreground">{type.name}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <Button onClick={generateReceipt} disabled={!selectedDept || !receiptType} className="w-full rounded-xl">
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa del Recibo
            </Button>
          </CardContent>
        </Card>

        {/* Recent Receipts */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Recibos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 1, dept: "101", type: "Agua", date: "05/12/2024", amount: 45.5 },
                { id: 2, dept: "201", type: "Mantenimiento", date: "04/12/2024", amount: 320.0 },
                { id: 3, dept: "102", type: "Electricidad", date: "03/12/2024", amount: 128.75 },
                { id: 4, dept: "302", type: "Agua", date: "02/12/2024", amount: 38.25 },
                { id: 5, dept: "202", type: "Mantenimiento", date: "01/12/2024", amount: 320.0 },
              ].map((receipt) => (
                <div
                  key={receipt.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Dpto {receipt.dept} - {receipt.type}
                      </p>
                      <p className="text-xs text-muted-foreground">{receipt.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-foreground">S/ {receipt.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Receipt Preview Modal */}
      <Dialog open={!!previewReceipt} onOpenChange={() => setPreviewReceipt(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Vista Previa del Recibo</DialogTitle>
          </DialogHeader>

          {previewReceipt && (
            <div className="space-y-4 mt-4">
              <div className="p-6 border border-border rounded-xl space-y-4 bg-card" id="receipt-preview">
                <div className="text-center border-b border-border pb-4">
                  <h3 className="font-bold text-xl text-foreground">{previewReceipt.building}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Recibo de {previewReceipt.typeName}</p>
                  <p className="text-xs text-muted-foreground">
                    N° {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Inquilino:</p>
                    <p className="font-medium text-foreground">{previewReceipt.tenant}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Departamento:</p>
                    <p className="font-medium text-foreground">{previewReceipt.department}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Período:</p>
                    <p className="font-medium text-foreground capitalize">{previewReceipt.month}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Fecha Emisión:</p>
                    <p className="font-medium text-foreground">{previewReceipt.date}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <h4 className="font-medium text-sm text-foreground mb-2">Detalle:</h4>
                  {previewReceipt.details.map((detail, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{detail.label}:</span>
                      <span className="text-foreground">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">TOTAL A PAGAR:</span>
                    <span className="text-2xl font-bold text-primary">S/ {previewReceipt.amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground border-t border-border pt-4">
                  <p>Gracias por su puntual pago</p>
                  <p>Administración {previewReceipt.building}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setPreviewReceipt(null)} className="flex-1 rounded-xl">
                  Cerrar
                </Button>
                <Button onClick={() => window.print()} className="flex-1 rounded-xl">
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
