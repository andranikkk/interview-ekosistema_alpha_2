import type React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, Image, useDisclosure } from "@nextui-org/react"
import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa6"

import { DeleteIcon } from "./button-icons/deleteIcon"
import type { Product } from "../../../constants/interface"
import { AiOutlineEdit } from "react-icons/ai"
import { ProductModal } from "../product-modal"
import { updateProduct } from "../../../app/slice"
import { useAppDispatch } from "../../../app/hooks"

interface IProduct {
  product: Product
  onLike: (product: Product) => void
  onDelete: (id: number) => void
}

const ProductBlock: React.FC<IProduct> = ({ product, onLike, onDelete }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onLike(product)
  }

  return (
    <>
      <Card
        isPressable
        onClick={() => navigate(`/products/${product.id}`)}
        key={product.id}
        className="p-3 w-[23.5rem]"
      >
        <CardHeader className="pt-0">
          <div className="font-[500] text-large text-wrap line-clamp-2 max-h-[55px] truncate flex gap-2">
            <span>{product.name}</span>
            <span>{product.lastname}</span>
          </div>
        </CardHeader>
        <div className="flex gap-3 w-full justify-center">
          <Image
            className="h-[16.5rem]"
            src={product.avatar}
            alt={product.createdAt}
          />
          <div className="flex flex-col gap-3 justify-around">
            <div
              onClick={handleLike}
              className={`flex flex-col p-4 rounded-xl items-center ${product.liked ? "bg-red-400" : "bg-pink-300"} hover:bg-pink-400`}
            >
              {product.liked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
              <p>{product.liked ? "Dislike" : "Like"}</p>
            </div>

            <div
              onClick={e => {
                e.stopPropagation()
                onDelete(product.id)
              }}
              className="flex flex-col bg-slate-300 p-4 rounded-xl items-center hover:bg-slate-400"
            >
              <DeleteIcon />
              <p>Delete</p>
            </div>

            <div
              onClick={e => {
                e.stopPropagation()
                onOpen()
              }}
              className="flex flex-col bg-blue-300 p-4 rounded-xl items-center hover:bg-blue-400"
            >
              <AiOutlineEdit size={25} />
              <p>Edit</p>
            </div>
          </div>
        </div>
      </Card>
      <ProductModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        initialValues={product}
        title="Edit product"
        onSubmit={updated => {
          dispatch(
            updateProduct({ ...product, ...updated, liked: product.liked }),
          )
        }}
      />
    </>
  )
}

export default ProductBlock
