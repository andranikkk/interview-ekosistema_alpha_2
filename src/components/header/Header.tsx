import { toggleShowLiked } from "../../app/slice"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  useDisclosure,
} from "@nextui-org/react"

import type { IHeader } from "./interface"
import { useAppDispatch } from "../../app/hooks"

const Header: React.FC<IHeader> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const dispatch = useAppDispatch()

  return (
    <Navbar className="h-[60px] w-full shadow-md rounded-br-3xl rounded-bl-3xl flex justify-center items-center">
      <div className="flex justify-center w-full items-center">
        <Button onPress={() => dispatch(toggleShowLiked())}>
          Liked products
        </Button>
        <Button onPress={onOpen}>Create a product</Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Enter product details
                </ModalHeader>
                <ModalBody></ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </Navbar>
  )
}

export default Header
