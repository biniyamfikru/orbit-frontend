import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Card } from "./ui/card"

interface InvoicePageProps {
  data: {
    staff: {
      name: string
      team: string
      id: string
    }
    patient: {
      name: string
      address: string
    }
    paymentType: string
    products: Array<{
      id: string
      name: string
      price: number
      quantity: number
    }>
  }
  onBack: () => void
}

export default function InvoicePage({ data, onBack }: InvoicePageProps) {
  // const res = await fetch('http://:5173/api/invoice', {
  const onSave = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/submtion/', {
      method: 'POST',
      body: JSON.stringify({
        staff_name: data.staff.name,    // Staff Name
        team: data.staff.team,          // Staff Team
        staff_id: data.staff.id,        // Staff ID
        patient_name: data.patient.name,  // Patient's name
        patient_address: data.patient.address,  // Patient's address
        payment_type: data.paymentType, // Payment type (service chosen)
        products: data.products.map(item => ({
          product_id: item.id,          // Product ID
          name: item.name,              // Product Name
          quantity: item.quantity,      // Quantity
          price: item.price,            // Price
          tax_rate: 0       // Tax Rate
        }))
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    console.log(res)
  }

  const onPay = async () => {
    const res = await fetch('https://souqpass.coopbankoromiasc.com/proxy/v1/payments/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      },
      body: JSON.stringify({
        "secretKey": "214d0755-f816-43c5-af62-e67d7e4410c9",
        "apiKey": "f3cd6392-411f-4fa1-80b9-fb8343042db7",
        "amount": 1000.0,
        "currency": "ETB",
        "paymentReason": data.paymentType,
        "transactionId": "TX12345",
        "notifyUrl": "http://yourcallbackurl.com/notify"
      })
    }).then(res => res.json())
    if (res.data.checkoutUrl) {
      window.open(res.data.checkoutUrl, '_blank');
    }
    console.log(res)
  }
  const total = data.products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-2">
          <h3 className="text-lg font-semibold border-b pb-2">Staff Information</h3>
          <div className="space-y-1">
            <p><span className="font-medium">Name:</span> {data.staff.name}</p>
            <p><span className="font-medium">Team:</span> {data.staff.team}</p>
            <p><span className="font-medium">ID:</span> {data.staff.id}</p>
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <h3 className="text-lg font-semibold border-b pb-2">Patient Information</h3>
          <div className="space-y-1">
            <p><span className="font-medium">Name:</span> {data.patient.name}</p>
            <p><span className="font-medium">Address:</span> {data.patient.address}</p>
          </div>
        </Card>
      </div>

      <Card className="p-4 space-y-2">
        <h3 className="text-lg font-semibold border-b pb-2">Payment Details</h3>
        <div className="space-y-1">
          <p><span className="font-medium">Payment Type:</span> {data.paymentType}</p>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Products</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell className="text-right">
                  ${(product.price * product.quantity).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold">
                Total:
              </TableCell>
              <TableCell className="text-right font-semibold">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button
          type="button"
          onClick={onPay}
          className="w-full"
          variant="default"
        >
          Pay
        </Button>
      </div>
    </div>
  )
} 