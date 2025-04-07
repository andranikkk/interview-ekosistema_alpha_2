import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "react-use"
import { Pagination } from "@nextui-org/react"

import { useAppDispatch, useAppSelector } from "../app/hooks"
import { deleteProductQuery, getProducts, toggleLikeQuery } from "../app/slice"
import { paginateProducts } from "../utils/getPaginatedProducts"
import { getData } from "../utils/getFilteredProducts"

import type { Product, SortDirection } from "../constants/interface"
import { ProductBlock } from "../components/ui/product-block"
import { Header } from "../components/ui/header"

const ProductFetcher: React.FC = () => {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [checkboxState, setCheckboxState] = useState(false)
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filteredCountries, setFilteredCountries] = useState<Product[]>([])

  const { products, isLoading } = useAppSelector(state => state.products)
  const showLikedProducts = useAppSelector(state => state.products.showLiked)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const displayedProducts = useMemo(
    () => (showLikedProducts ? products.filter(p => p.liked) : products),
    [products, showLikedProducts],
  )

  const PAGE_SIZE = 10
  const totalPages = Math.ceil(displayedProducts.length / PAGE_SIZE)
  const paginatedProducts = useMemo(
    () => paginateProducts(displayedProducts, page, PAGE_SIZE),
    [displayedProducts, page],
  )

  const { visibleItems } = useMemo(
    () =>
      getData({
        items: paginatedProducts,
        sortDirection,
        sortByAge: checkboxState,
        searchQuery: searchQuery.toLowerCase(),
      }),
    [paginatedProducts, sortDirection, searchQuery, checkboxState],
  )

  useDebounce(
    () => {
      setFilteredCountries(visibleItems)
    },

    235,
    [paginatedProducts],
  )

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col gap-5 items-center">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        checkboxState={checkboxState}
        setCheckboxState={setCheckboxState}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      {displayedProducts.length === 0 && (
        <div>
          {showLikedProducts
            ? "No liked products available"
            : "No products available"}
        </div>
      )}
      <div className="flex flex-wrap gap-5 items-center w-full justify-center">
        {visibleItems.map((product: Product) => (
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
      <Pagination
        initialPage={1}
        total={totalPages}
        onChange={page => setPage(page)}
      />
    </div>
  )
}

export default ProductFetcher
