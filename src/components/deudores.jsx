"use client"

import { useState } from "react"
import { Search, CreditCard, History } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { departments, paymentHistory, buildings } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Deudores({ selectedBuilding }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDebtor, setSelectedDebtor] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")

  const filteredDepts = departments
    .filter((d) => d.building === selectedBuilding)
    .filter((d) => {
      if (filterStatus === "deudores") return d.debt > 0
      if (filterStatus === "aldia") return d.debt === 0
      return true
    })
    .filter((d) => d.owner.toLowerCase().includes(searchTerm.toLowerCase()) || d.number.includes(searchTerm))

  const debtorHistory = selectedDebtor ? paymentHistory.filter((p) => p.departmentId === selectedDebtor.id) : []

  const handleRegisterPayment = () => {
    alert(`Pago de S/ ${paymentAmount} registrado para el departamento ${selectedDebtor?.number}`)
    setPaymentAmount("")
    setShowPaymentModal(false)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Gestión de Deudores</h1>
        <p className="text-muted-foreground mt-1">{buildings.find((b) => b.id === selectedBuilding)?.name}</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className="rounded-xl"
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === "deudores" ? "default" : "outline"}
            onClick={() => setFilterStatus("deudores")}
            className="rounded-xl"
          >
            Con Deuda
          </Button>
          <Button
            variant={filterStatus === "aldia" ? "default" : "outline"}
            onClick={() => setFilterStatus("aldia")}
            className="rounded-xl"
          >
            Al Día
          </Button>
        </div>
      </div>

      {/* Debtors List */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Dpto</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Propietario</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Inquilino</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Monto Adeudado</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Meses de Mora</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepts.map((dept) => (
                  <tr
                    key={dept.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-medium text-foreground">{dept.number}</span>
                    </td>
                    <td className="p-4 text-foreground">{dept.owner}</td>
                    <td className="p-4 text-muted-foreground">{dept.tenant}</td>
                    <td className="p-4">
                      <span className={dept.debt > 0 ? "text-destructive font-semibold" : "text-foreground"}>
                        S/ {dept.debt.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{dept.monthsOverdue}</td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          dept.debt > 0 ? "bg-destructive/10 text-destructive" : "bg-chart-2/10 text-chart-2"
                        }`}
                      >
                        {dept.debt > 0 ? "Con Deuda" : "Al Día"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedDebtor(dept)} className="rounded-lg">
                        Ver Detalle
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selectedDebtor && !showPaymentModal} onOpenChange={() => setSelectedDebtor(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">
                {selectedDebtor?.number}
              </div>
              <div>
                <p className="text-lg font-semibold">{selectedDebtor?.owner}</p>
                <p className="text-sm text-muted-foreground font-normal">Departamento {selectedDebtor?.number}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Monto Adeudado</p>
                <p className="text-xl font-semibold text-destructive">S/ {selectedDebtor?.debt.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Meses de Mora</p>
                <p className="text-xl font-semibold text-foreground">{selectedDebtor?.monthsOverdue}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <History className="w-4 h-4" />
                Historial de Pagos
              </h4>
              <div className="space-y-2">
                {debtorHistory.length > 0 ? (
                  debtorHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">{payment.concept}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <span className="text-sm font-semibold text-chart-2">S/ {payment.amount.toFixed(2)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Sin pagos registrados</p>
                )}
              </div>
            </div>

            {selectedDebtor?.debt > 0 && (
              <Button onClick={() => setShowPaymentModal(true)} className="w-full rounded-xl">
                <CreditCard className="w-4 h-4 mr-2" />
                Registrar Pago
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Registrar Pago</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-sm text-muted-foreground">
              Departamento {selectedDebtor?.number} - {selectedDebtor?.owner}
            </p>
            <p className="text-sm">
              Deuda actual: <span className="font-semibold text-destructive">S/ {selectedDebtor?.debt.toFixed(2)}</span>
            </p>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Monto a Pagar (S/)</label>
              <Input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="0.00"
                className="rounded-xl"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1 rounded-xl">
                Cancelar
              </Button>
              <Button onClick={handleRegisterPayment} className="flex-1 rounded-xl" disabled={!paymentAmount}>
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
