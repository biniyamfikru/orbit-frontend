import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

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
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Staff Information</h3>
        <p>Name: {data.staff.name}</p>
        <p>Team: {data.staff.team}</p>
        <p>ID: {data.staff.id}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Patient Information</h3>
        <p>Name: {data.patient.name}</p>
        <p>Address: {data.patient.address}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Payment Type</h3>
        <p>{data.paymentType}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Products</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>${product.price * product.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4} className="text-right font-semibold">
                Total:
              </TableCell>
              <TableCell className="font-semibold">${total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button type="button" onClick={onSave} className="w-full">
          Save Invoice
        </Button>
      </div>
    </div>
  )
} 