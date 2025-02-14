import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

interface DataManagementProps {
  onBack: () => void
}

// Add interface for the product type
interface Product {
  product_id: string;
  name: string;
  quantity: number;
  price: string;
  tax_rate: number;
}

// Add interface for the record type
interface Record {
  staff_name: string;
  team: string;
  staff_id: string;
  patient_name: string;
  patient_address: string;
  payment_type: string;
  products: Product[];
}

export default function DataManagement({ onBack }: DataManagementProps) {
  const [records, setRecords] = useState<Record[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      const dataRes = await fetch(" http://127.0.0.1:8000/api/list/", {
        method: "GET",
      })

      const data = await dataRes.json()
      setRecords(data)
    }
    fetchData()
  }, [])

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRecords = records.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(records.length / itemsPerPage)

  // Add pagination controls
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleExport = () => {
    // Implementation for exporting to Excel
    console.log("Exporting to Excel...")
  }

  const handleClear = () => {
    // Implementation for clearing data
    setRecords([])
    localStorage.clear()
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-4 mb-4">
        <Button type="button" onClick={handleExport} className="w-full">
          Export to Excel
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleClear}
          className="w-full"
        >
          Clear Data
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell>{record.staff_name}</TableCell>
              <TableCell>{record.team}</TableCell>
              <TableCell>{record.patient_name}</TableCell>
              <TableCell>{record.payment_type}</TableCell>
              <TableCell>
                {record.products.map(product => product.name).join(", ")}
              </TableCell>
              <TableCell>
                ${record.products.reduce((sum, product) =>
                  sum + (Number(product.price) * product.quantity), 0
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add pagination controls */}
      <div className="flex justify-center space-x-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="py-2 px-4">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <Button type="button" variant="outline" onClick={onBack} className="w-full">
        Back
      </Button>
    </div>
  )
} 