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

export const toggleLikeQuery = createAsyncThunk(
  "products/toggleLike",
  async (product: Product, { rejectWithValue }) => {
    try {
      const updatedProduct = { ...product, liked: !product.liked }

      const response = await axios.put(
        `${BASE_URL}/${product.id}`,
        updatedProduct,
      )

      return response.data as Product
    } catch (error) {
      console.error("Error toggling like:", error)
      return rejectWithValue(error)
    }
  },
)

export const deleteProductQuery = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`)
      return id
    } catch (error) {
      console.error("Error deleting product:", error)
      return rejectWithValue(error)
    }
  },
)

const initialState: ProductsState = {
  products: [],
  showLiked: false,
  isLoading: true,
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload
    },

    toggleShowLiked(state) {
      state.showLiked = !state.showLiked
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
      })

      .addCase(getProducts.rejected, state => {
        state.isLoading = false
      })

      .addCase(toggleLikeQuery.fulfilled, (state, action) => {
        const updatedProduct = action.payload

        state.products = state.products.map(product =>
          product.id === updatedProduct.id ? updatedProduct : product,
        )
      })

      .addCase(deleteProductQuery.fulfilled, (state, action) => {
        state.products = state.products.filter(
          product => product.id !== action.payload,
        )
      })
  },
})

export const { setProducts, toggleShowLiked } = productsSlice.actions

export default productsSlice.reducer
