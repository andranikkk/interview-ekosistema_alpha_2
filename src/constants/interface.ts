export interface Product {
  age: string
  avatar: string
  createdAt: string
  gender: string
  id: number
  lastname: string
  name: string
  phone: string
  liked: boolean
}

export interface ProductsState {
  products: Product[]
  likedProducts: Product[]
  showLiked: boolean
  isLoading: boolean
}

export interface IProduct {
  product: Product
  onLike: (product: Product) => void
  onDelete: (id: number) => void
}
