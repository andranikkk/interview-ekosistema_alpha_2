import {
  Button,
  Checkbox,
  Input,
  Navbar,
  useDisclosure,
} from "@nextui-org/react"
import { createProduct, toggleShowLiked } from "../../../app/slice"

import type { IHeader } from "./interface"
import { useAppDispatch } from "../../../app/hooks"
import { ProductModal } from "../product-modal"

const Header: React.FC<IHeader> = ({
  searchQuery,
  setSearchQuery,
  checkboxState,
  setCheckboxState,
  setSortDirection,
  sortDirection,
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const dispatch = useAppDispatch()

  return (
    <Navbar className="h-[60px] w-full shadow-md rounded-br-3xl rounded-bl-3xl flex justify-center items-center">
      <div className="flex justify-center w-full items-center gap-8">
        <Input
          type="text"
          className="w-[20%]"
          placeholder="Search"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <Button onPress={() => dispatch(toggleShowLiked())}>
          Liked products
        </Button>
        <Button onPress={onOpen}>Create a product</Button>

        <ProductModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          title="Create a product"
          onSubmit={data => {
            dispatch(createProduct({ ...data, liked: false }))
          }}
        />

        <div className="flex items-center gap-2">
          <div>
            <Checkbox onClick={() => setCheckboxState(!checkboxState)} />
            <label htmlFor="">Sort by age </label>
          </div>
          <Button
            size="sm"
            disabled={!checkboxState}
            onClick={() =>
              setSortDirection(sortDirection === "desc" ? "asc" : "desc")
            }
          >
            {sortDirection}
          </Button>
        </div>
      </div>
    </Navbar>
  )
}

export default Header
