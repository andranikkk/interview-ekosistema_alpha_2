import type { SortDirection } from "../../../constants/interface"

export interface IHeader {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>

  checkboxState: boolean
  setCheckboxState: React.Dispatch<React.SetStateAction<boolean>>

  sortDirection: string
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>

  active?: boolean
}
