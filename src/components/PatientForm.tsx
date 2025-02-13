import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface PatientFormProps {
  data: {
    name: string
    address: string
  }
  onNext: (data: { name: string; address: string }) => void
  onBack: () => void
}

export default function PatientForm({ data, onNext, onBack }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: data.name,
    address: data.address,
  })

  const [errors, setErrors] = useState({
    name: "",
    address: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      address: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Patient name is required"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== "")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Patient Name</Label>
          <Input
            id="name"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="flex space-x-4">
          <Button type="button" variant="outline" onClick={onBack} className="w-full">
            Back
          </Button>
          <Button type="submit" className="w-full">
            Next
          </Button>
        </div>
      </div>
    </form>
  )
} 