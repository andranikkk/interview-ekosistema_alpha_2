import { configureStore } from "@reduxjs/toolkit"
// import { productsApi } from "./api"
import productsSlice from "./slice"

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
