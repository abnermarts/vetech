import { useContext, useState, useMemo } from "react";
import { CertificateContext } from "@/context/CertificateContext";
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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function DataTable({
  columns,
  data,
  getAnimalRow = () => {},
  columnsName,
  selectedRowIds = [],
  isLoading = false,
}) {
  // Deriva rowSelection do array de IDs
  const rowSelection = useMemo(() => {
    const selection = {};
    selectedRowIds.forEach((id) => {
      selection[id] = true;
    });
    return selection;
  }, [selectedRowIds]);

  const { registerGetDataFn } = useContext(CertificateContext);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: (updater) => {
      let newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      const selectedRows = data.filter((row) => newSelection[row.id]);
      if (typeof getAnimalRow === "function") {
        getAnimalRow(selectedRows);
      }
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { rowSelection, sorting, columnFilters, pagination },
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
  });

  registerGetDataFn(() =>
    table.getSelectedRowModel().rows.map((row) => row.original)
  );

  return (
    <div className="w-full max-h-dvh justify-center items-center">
      <div className="flex items-center py-4">
        <Input
          placeholder="Procure pelo nome..."
          value={table.getColumn(columnsName)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(columnsName)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((col, j) => (
                    <TableCell key={j}>
                      <Skeleton height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={`${row.original.id}_${row.index}`}
                  data-state={row.getIsSelected() ? "selected" : ""}
                  className="cursor-pointer"
                  onClick={() => row.toggleSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
      <div className="flex items-center justify-end space-x-2 py-4">
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
      </div>
    </div>
  );
}
