import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Button,
} from "@nextui-org/react"
import { useForm } from "react-hook-form"

export interface ProductFormValues {
  name: string
  avatar: string
  phone: string
  age: string
  gender: string
  lastname: string
  createdAt: string
}

interface ProductModalProps {
  isOpen: boolean
  onOpenChange: () => void
  onClose: () => void
  initialValues?: Partial<ProductFormValues>
  onSubmit: (data: ProductFormValues) => void
  title?: string
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onOpenChange,
  onClose,
  initialValues = {},
  onSubmit,
  title = "Product Details",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: initialValues,
  })

  const submitAndClose = (data: ProductFormValues) => {
    onSubmit(data)
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(submitAndClose)}
              className="flex flex-col gap-3"
            >
              <input
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                className="p-2 border rounded-md"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <input
                placeholder="Lastname"
                {...register("lastname", { required: "Lastname is required" })}
                className="p-2 border rounded-md"
              />
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}

              <input
                placeholder="Gender"
                {...register("gender", { required: "Gender is required" })}
                className="p-2 border rounded-md"
              />
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}

              <input
                type="number"
                placeholder="Phone"
                {...register("phone", {
                  required: "Phone is required",
                  valueAsNumber: true,
                })}
                className="p-2 border rounded-md"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}

              <input
                type="number"
                placeholder="Age"
                {...register("age", {
                  required: "Age is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Age must be positive" },
                })}
                className="p-2 border rounded-md"
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}

              <Button type="submit" color="primary">
                Save
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </form>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  )
}

export default ProductModal
