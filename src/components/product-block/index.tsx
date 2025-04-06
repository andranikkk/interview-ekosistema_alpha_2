import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react"

import { FaRegHeart } from "react-icons/fa"
import { FaHeart } from "react-icons/fa6"
import { DeleteIcon } from "./button-icons/deleteIcon"

import type { IProduct } from "../../constants/interface"

export const ProductBlock: React.FC<IProduct> = ({
  product,
  onLike,
  onDelete,
}) => {
  const [isLiked, setIsLiked] = useState(product.liked)

  const navigate = useNavigate()

  useEffect(() => {
    setIsLiked(product.liked)
  }, [product.liked])

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()

    setIsLiked(!isLiked)

    onLike(product)
  }

  return (
    <Card
      isPressable
      onClick={() => navigate(`/products/${product.id}`)}
      key={product.id}
      className="p-3 w-[20rem] max-h-[19rem]"
    >
      <CardHeader className="pt-0">
        <div className="font-[500] text-large text-wrap line-clamp-2 max-h-[55px] truncate flex gap-2">
          <span>{product.name}</span>
          <span>{product.lastname}</span>
        </div>
      </CardHeader>
      <div className="flex gap-3 w-full justify-center">
        <Image
          className="h-[13.75rem]"
          src={product.avatar}
          alt={product.createdAt}
        />
        <div className="flex flex-col gap-3 justify-around">
          <div
            onClick={handleLike}
            className={`flex flex-col p-4 rounded-xl items-center ${isLiked ? "bg-red-400" : "bg-pink-300"} hover:bg-pink-400`}
          >
            {isLiked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
            <p>{isLiked ? "Dislike" : "Like"}</p>
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
        </div>
      </div>
    </Card>
  )
}
