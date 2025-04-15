import { useMemo, useState } from "react"
import { Table } from "./table/table"
import { TableEmptyState } from "./table/table-empty-state"
import { SortableHeaderCell, TableHeader } from "./table/table-header"
import { TableRow } from "./table/table-row"
import { TableCell } from "./table/table-cell"
import { TablePagination } from "./table/table-pagination"

type Admin = {
  _id: string
  fullName: string
}

type Props = {
  admins: Admin[]
  itemsPerPage?: number
}

type SortField = "index" | "fullName" | "id"
type SortDirection = "asc" | "desc"

export default function AdminTable({ admins, itemsPerPage = 5 }: Props) {
  const [sortField, setSortField] = useState<SortField>("index")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedAdmins = useMemo(() => {
    if (!admins.length) return []

    return [...admins].sort((a, b) => {
      const modifier = sortDirection === "asc" ? 1 : -1

      switch (sortField) {
        case "fullName":
          return a.fullName.localeCompare(b.fullName) * modifier
        case "id":
          return a._id.localeCompare(b._id) * modifier
        default:
          return 0 
      }
    })
  }, [admins, sortField, sortDirection])

  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return sortedAdmins.slice(startIndex, startIndex + itemsPerPage)
  }, [sortedAdmins, currentPage, itemsPerPage])

  const totalPages = Math.max(1, Math.ceil(admins.length / itemsPerPage))

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (!admins.length) {
    return (
      <Table className="mt-4" caption="Admin List">
        <TableEmptyState message="No administrators found" />
      </Table>
    )
  }

  return (
    <Table className="mt-4" caption="Admin List">
      <TableHeader>
        <TableRow>
          <SortableHeaderCell
            isSorted={sortField === "index"}
            sortDirection={sortField === "index" ? sortDirection : null}
            onSort={() => handleSort("index")}
          >
            #
          </SortableHeaderCell>
          <SortableHeaderCell
            isSorted={sortField === "fullName"}
            sortDirection={sortField === "fullName" ? sortDirection : null}
            onSort={() => handleSort("fullName")}
          >
            Full Name
          </SortableHeaderCell>
          <SortableHeaderCell
            isSorted={sortField === "id"}
            sortDirection={sortField === "id" ? sortDirection : null}
            onSort={() => handleSort("id")}
          >
            Admin ID
          </SortableHeaderCell>
        </TableRow>
      </TableHeader>
      <div className="text-zinc-800" role="rowgroup">
        {paginatedAdmins.map((admin, index) => {
          const actualIndex = (currentPage - 1) * itemsPerPage + index + 1
          return (
            <TableRow key={admin._id}>
              <TableCell>{actualIndex}</TableCell>
              <TableCell>{admin.fullName}</TableCell>
              <TableCell className="font-mono text-sm text-zinc-500">{admin._id}</TableCell>
            </TableRow>
          )
        })}
      </div>
      {admins.length > itemsPerPage && (
        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </Table>
  )
}
