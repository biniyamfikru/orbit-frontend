import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface UserFormProps {
  data: {
    name: string
    team: string
    id: string
  }
  onNext: (data: { name: string; team: string; id: string }) => void
}

export default function UserForm({ data, onNext }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: data.name,
    team: data.team,
    id: data.id,
  })

  const [errors, setErrors] = useState({
    name: "",
    team: "",
    id: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      team: "",
      id: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Staff name is required"
    }
    if (!formData.team.trim()) {
      newErrors.team = "Team is required"
    }
    if (!formData.id.trim()) {
      newErrors.id = "Staff ID is required"
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
          <Label htmlFor="name">Staff Name</Label>
          <Input
            id="name"
            placeholder="Enter staff name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="team">Team</Label>
          <Input
            id="team"
            placeholder="Enter team name"
            value={formData.team}
            onChange={(e) => setFormData({ ...formData, team: e.target.value })}
          />
          {errors.team && <p className="text-sm text-red-500">{errors.team}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="id">Staff ID</Label>
          <Input
            id="id"
            placeholder="Enter staff ID"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          />
          {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
        </div>

        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>
    </form>
  )
} 