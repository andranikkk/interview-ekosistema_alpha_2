import type { PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../constants/constants"
import type { Product, ProductsState } from "../constants/interface"

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const resp = await axios.get(`${BASE_URL}`, {})

      return resp.data
    } catch (error) {
      console.error("Error fetching products", error)
      throw error
    }
  },
)

const initialState: ProductsState = {
  products: [],
  likedProducts: [],
  showLiked: false,
  isLoading: true,
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
      state.likedProducts = state.products.filter(product => product.liked)
    },
    toggleLike(state, { payload }: PayloadAction<Product>) {
      state.products = state.products.map(product =>
        product.id === payload.id
          ? { ...product, liked: !product.liked }
          : product,
      )

      state.likedProducts = state.products.filter(product => product.liked)
    },
    toggleShowLiked(state) {
      state.showLiked = !state.showLiked
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        product => product.id !== action.payload,
      )
      state.likedProducts = state.likedProducts.filter(
        product => product.id !== action.payload,
      )
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload
        state.likedProducts = state.products.filter(product => product.liked)
      })

      .addCase(getProducts.rejected, state => {
        state.isLoading = false
      })
  },
})

export const { setProducts, toggleLike, toggleShowLiked, deleteProduct } =
  productsSlice.actions

export default productsSlice.reducer
