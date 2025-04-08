import { Provider } from "react-redux"
import { createRoot } from "react-dom/client"
import { NextUIProvider } from "@nextui-org/react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom"

import { store } from "./app/store"
import ProductFetcher from "./pages/FetchProducts"
import { ProductPage } from "./pages/ProductPage"

import "./index.css"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <NextUIProvider>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductFetcher />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Routes>
        </HashRouter>
      </Provider>
    </NextUIProvider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
