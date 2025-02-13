import { useState } from "react"
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

export default function DataManagement({ onBack }: DataManagementProps) {
  // In a real app, this would be fetched from localStorage or a database
  const [records, setRecords] = useState([])

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
            <TableHead>Date</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record: any, index) => (
            <TableRow key={index}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.patient}</TableCell>
              <TableCell>{record.paymentType}</TableCell>
              <TableCell>${record.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button type="button" variant="outline" onClick={onBack} className="w-full">
        Back
      </Button>
    </div>
  )
} 