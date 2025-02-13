import { Button } from "./ui/button"
import { Card } from "./ui/card"

interface PaymentTypeFormProps {
  selected: string
  onNext: (type: string) => void
  onBack: () => void
}

const paymentTypes = [
  "Laboratory",
  "Pharmacy",
  "Radiology",
  "Procedure",
  "Registration",
  "Bed Service",
]

export default function PaymentTypeForm({ selected, onNext, onBack }: PaymentTypeFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {paymentTypes.map((type) => (
          <Card
            key={type}
            className={`p-4 cursor-pointer transition-colors ${
              selected === type
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
            onClick={() => onNext(type)}
          >
            <div className="text-center">{type}</div>
          </Card>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={onBack} className="w-full">
        Back
      </Button>
    </div>
  )
} 