import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteProductQuery, getProducts, toggleLikeQuery } from "../app/slice"
import type { Product } from "../constants/interface"

import { Header } from "../components/header"
import { ProductBlock } from "../components/product-block"

const ProductFetcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const showLikedProducts = useAppSelector(state => state.products.showLiked)
  const { products, isLoading } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const displayedProducts = showLikedProducts
    ? products.filter(p => p.liked)
    : products

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex-wrap flex gap-5 p-4 justify-center">
      <Header />
      {displayedProducts.length === 0 && (
        <div>
          {showLikedProducts
            ? "No liked products available"
            : "No products available"}
        </div>
      )}
      {displayedProducts.map((product: Product) => (
        <ProductBlock
          key={product.id}
          product={product}
          onLike={product => {
            dispatch(toggleLikeQuery(product))
          }}
          onDelete={id => {
            dispatch(deleteProductQuery(id))
          }}
        />
      ))}
    </div>
  )
}

export default ProductFetcher
