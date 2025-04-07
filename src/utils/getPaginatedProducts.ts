import type { Product } from "../constants/interface"

export const paginateProducts = (
  items: Array<Product>,
  page: number,
  pageSize: number,
) => {
  return items.slice((page - 1) * pageSize, page * pageSize)
}
