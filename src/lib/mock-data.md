## buildings
- _id: { $oid: '6939d32b6657f73f6cba493c' },
- name: 'Edificio Las Flores',
- address: 'Florida 475, C1005 AAI, Cdad. Autónoma de Buenos Aires',

- _id: { $oid: '693c3dd9bd108ccb8af9b0fd' },
- name: 'Edificio Palmas Real',
- address: 'Paraná 416, C1017AAJ San Nicolas, Cdad. Autónoma de Buenos Aires',

- _id: { $oid: '693c3e10bd108ccb8af9b0fe' },
- name: 'Edificio Brisas Marinas I',
- address: 'Montevideo 604, C1019ABN Cdad. Autónoma de Buenos Aires',

## deparments
- _id:{"$oid":"6936e9c97ef5b4e8400caa47"}
- floor:"PB"
- "tenant":"María García"
- "createdAt":{"$date":{"$numberLong":"1765206473341"}}
- "updatedAt":{"$date":{"$numberLong":"1765206473341"}}
- "building":{"$oid":"6939d32b6657f73f6cba493c"}
- "debt":{"$numberDecimal":"450.0"}
- "electricityReading":{"$numberInt":"380"}
- "monthsOverdue":{"$numberInt":"2"}
- "number":"01"
- "owner":"Carlos Mendoza"
- "waterReading":{"$numberInt":"125"}

## invoices
- _id: string,               // ID único del invoice
- invoiceNumber: string,    // número de recibo legible (ej: BS-2025-00123) - BV = Boleta de Servicios
- buildingId: string,       // opcional si manejas clientes
- departmentId: string,     // si manejas varios departamentos/áreas
- items: [
    {
      description: string,
      quantity: number,
      unitPrice: number,
      total: number,        // quantity * unitPrice
    }
  ],
- subtotal: number,         // suma de items
- tax: number,              // si aplicas IGV u otro impuesto
- total: number,            // subtotal + tax
- status: "pending" | "partial" | "paid" | "cancelled",
- issuedAt: Date,           // fecha de creación del invoice
- dueDate: Date | null,     // si aplicas fecha de vencimiento
- notes: string | null,     // notas internas
- createdBy: string,        // usuario que generó el invoice
- updatedAt: Date


## payments (colección)
- _id (ObjectId)
- paymentNumber: string → PTM-(fecha)
- departmentId (ObjectId) → referencia a departments
- buildingId (ObjectId) → redundante PERO útil para filtrar (mejora rendimiento)
- invoiceId (ObjectId) → redundante PERO útil para filtrar (mejora rendimiento)
- date (Date)
- amount (Number)
- method (string)
- notes (String)
- createdAt (Date)
- updatedAt (Date)

## settings
- _id
- type: "rates"
- waterRate
- sewerRate
- electricityRate
- maintenance (array)> Objects
  - buildingId
  - value
- tax
- updatedAt

