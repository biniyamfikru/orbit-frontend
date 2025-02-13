import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface Product {
  id: string
  name: string
  price: number
  quantity: number
}

interface ProductSelectionProps {
  selected: Product[]
  onNext: (products: Product[]) => void
  onBack: () => void
}

// Sample products - in a real app, this would come from an API or database
const availableProducts = [
  { id: "P1", name: "Blood Test", price: 50 },
  { id: "P2", name: "X-Ray", price: 100 },
  { id: "P3", name: "Consultation", price: 75 },
  { id: "P4", name: "Medicine Pack", price: 25 },
]

export default function ProductSelection({ selected, onNext, onBack }: ProductSelectionProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(selected)

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 0) return

    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === productId)
      if (existing) {
        if (quantity === 0) {
          return prev.filter((p) => p.id !== productId)
        }
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity } : p
        )
      }
      const product = availableProducts.find((p) => p.id === productId)
      if (product && quantity > 0) {
        return [...prev, { ...product, quantity }]
      }
      return prev
    })
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  value={selectedProducts.find((p) => p.id === product.id)?.quantity || 0}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value) || 0)
                  }
                  className="w-20"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex space-x-4">
        <Button type="button" variant="outline" onClick={onBack} className="w-full">
          Back
        </Button>
        <Button
          type="button"
          onClick={() => onNext(selectedProducts)}
          className="w-full"
          disabled={selectedProducts.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  )
} 