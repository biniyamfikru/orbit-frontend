import { useState } from 'react'
// import { Card } from "@/components/ui/card"
import UserForm from './components/UserForm'
import PatientForm from './components/PatientForm'
import PaymentTypeForm from './components/PaymentTypeForm'
import ProductSelection from './components/ProductSelection'
// import InvoicePage from './components/InvoicePage'
import DataManagement from './components/DataManagement'
import { Card } from './components/ui/card'

type FormData = {
  staff: {
    name: string;
    team: string;
    id: string;
  };
  patient: {
    name: string;
    address: string;
  };
  paymentType: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

function App() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    staff: { name: '', team: '', id: '' },
    patient: { name: '', address: '' },
    paymentType: '',
    products: []
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Health Center Payment System
            </h1>
            <div className="mt-2 text-center text-sm text-gray-600">
              Step {step} of 6
            </div>
          </div>

          {step === 1 && (
            <UserForm 
              data={formData.staff}
              onNext={(staffData) => {
                setFormData({ ...formData, staff: staffData })
                nextStep()
              }}
            />
          )}

          {step === 2 && (
            <PatientForm
              data={formData.patient}
              onNext={(patientData) => {
                setFormData({ ...formData, patient: patientData })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {step === 3 && (
            <PaymentTypeForm
              selected={formData.paymentType}
              onNext={(type) => {
                setFormData({ ...formData, paymentType: type })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {step === 4 && (
            <ProductSelection
              selected={formData.products}
              onNext={(products) => {
                setFormData({ ...formData, products })
                nextStep()
              }}
              onBack={prevStep}
            />
          )}

          {step === 5 && (
            <>stpe</>
            // <InvoicePage
            //   data={formData}
            //   onSave={() => nextStep()}
            //   onBack={prevStep}
            // />
          )}

          {step === 6 && (
            <DataManagement
              onBack={prevStep}
            />
          )}
        </Card>
      </div>
    </div>
  )
}

export default App
