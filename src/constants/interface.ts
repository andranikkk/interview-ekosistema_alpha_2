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
  showLiked: boolean
  isLoading: boolean
}
