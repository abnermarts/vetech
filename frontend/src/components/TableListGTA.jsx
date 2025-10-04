import { useState } from "react";
import {
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import "react-loading-skeleton/dist/skeleton.css";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useContext } from "react";
import { EventDetailContext } from "@/context/EventDetailContext";

export function TableListGTA({
  columns,
  data,
  columnsName,
  isLoading = false,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 100 });
  const { setDataDetail } = useContext(EventDetailContext);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters, pagination },
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
  });

  return (
    <div className="w-[35%] h-full flex flex-col justify-start items-start">
      <div className="flex items-center py-4 flex-shrink-0">
        <Input
          placeholder="Procure pelo nome do evento.."
          value={table.getColumn(columnsName)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(columnsName)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto w-full">
        <Table>
          <TableBody className="flex flex-col gap-2 [&_tr:last-child]:border ">
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((j, idx) => (
                    <TableCell key={j.id || j.accessorKey || idx}>
                      <Skeleton height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`${row.original.id}_${row.index}`}
                  onClick={() => {
                    setDataDetail(row.original);
                    console.log(row.original);
                    console.log(row.index);
                  }}
                  data-state={row.getIsSelected() ? "selected" : ""}
                  className="w-full flex cursor-pointer bg-white p-2 border border-solid border-[#eeeeee] rounded-lg hover:border-[#bbbbbb] hover:bg-[#ffffff]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-full">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum registro localizado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ArrowRight />
        </Button>
      </div> */}
    </div>
  );
}
