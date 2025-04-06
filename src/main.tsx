import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

import { store } from "./app/store"

import ProductFetcher from "./pages/FetchProducts"
import { ProductPage } from "./pages/ProductPage"

import "./index.css"

const container = document.getElementById("root")

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/products" replace /> },
  { path: "/products", element: <ProductFetcher /> },
  { path: "/products/:id", element: <ProductPage /> },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <NextUIProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </NextUIProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
