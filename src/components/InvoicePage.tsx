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
  onSave: () => void
  onBack: () => void
}

export default function InvoicePage({ data, onSave, onBack }: InvoicePageProps) {
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
          onClick={onSave} 
          className="w-full"
          variant="default"
        >
          Save Invoice
        </Button>
      </div>
    </div>
  )
} 