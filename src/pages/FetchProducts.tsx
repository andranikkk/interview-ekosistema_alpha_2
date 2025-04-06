import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteProduct, getProducts, toggleLike } from "../app/slice"
import type { Product } from "../constants/interface"

import { ProductBlock } from "../components/product-block"
import { Header } from "../components/header"

const ProductFetcher: React.FC = () => {
  const dispatch = useAppDispatch()
  const likedProducts = useAppSelector(state => state.products.likedProducts)
  const showLikedProducts = useAppSelector(state => state.products.showLiked)
  const { products, isLoading } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const displayedProducts = showLikedProducts
    ? likedProducts
    : products?.flat() || []

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
          onLike={likedProduct => {
            dispatch(toggleLike(likedProduct))
          }}
          onDelete={id => {
            dispatch(deleteProduct(id))
          }}
        />
      ))}
    </div>
  )
}

export default ProductFetcher
