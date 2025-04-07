import axios from "axios"
import type React from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Image } from "@nextui-org/react"

import { BASE_URL } from "../constants/constants"
import type { Product } from "../constants/interface"

import { GoBack } from "../components/ui/go-back"

export const ProductPage: React.FC = () => {
  const [productsData, setProductsData] = useState<Product>({} as Product)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const params = useParams()

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true)

      try {
        const response = await axios.get(`${BASE_URL}/${params.id}`)

        setProductsData(response.data)
      } catch (error) {
        setError((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchProductsData()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!productsData) return <div>No data available</div>

  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <Card className="w-[80%] h-[80%] p-5">
        <GoBack />
        <div className="text-center">
          <p className="text-3xl font-semibold">{productsData.name}</p>
          <p className="text-3xl font-semibold">{productsData.lastname}</p>
        </div>
        <div className="flex flex-row gap-5 p-5">
          <div>
            <Image src={productsData.avatar} className="w-[330px] h-[400px]" />
          </div>

          <div className="text-xl flex gap-5 flex-col">
            <p>
              <span className="font-semibold">Age:</span>{" "}
              {productsData.age && productsData.age}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {productsData.gender && productsData.gender}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {productsData.phone && productsData.phone}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
