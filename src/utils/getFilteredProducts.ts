import type { Product, SortDirection } from "../constants/interface"

type GetListDataType = {
  items: Product[]
  sortDirection: SortDirection
  sortByAge: boolean
  searchQuery: string
}

export const getData = ({
  items,
  sortDirection,
  sortByAge,
  searchQuery,
}: GetListDataType) => {
  const filtered = filterListData(items, searchQuery)
  const sorted = sortListData(filtered, sortDirection, sortByAge)

  console.log(sorted, "a<><><>><><><>")

  return { visibleItems: sorted }
}

const filterListData = (items: Array<Product>, searchQuery: string) => {
  return items.filter((item: Product) =>
    item.name.toLowerCase().includes(searchQuery),
  )
}

const sortListData = (
  items: Array<Product>,
  sortDirection: SortDirection,
  sortByAge: boolean,
) => {
  if (sortByAge) {
    return items.sort((a, b) =>
      sortDirection === "asc"
        ? parseInt(a.age) - parseInt(b.age)
        : parseInt(b.age) - parseInt(a.age),
    )
  } else {
    return items
  }
}
