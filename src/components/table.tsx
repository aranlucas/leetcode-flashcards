import {
  Grid,
  Group,
  Pagination,
  Skeleton,
  Table as MantineTable,
} from "@mantine/core";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";

interface TableProps<T> {
  items: T[];
  columnDefinitions: Array<ColumnDef<T, any>>;
  isLoading?: boolean;
}

export default function Table<T>({
  items,
  columnDefinitions,
  isLoading,
}: TableProps<T>) {
  const data = useMemo(() => {
    return items;
  }, [items]);

  const columns = useMemo(() => {
    return columnDefinitions;
  }, [columnDefinitions]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <Grid>
        <Grid.Col span={8}></Grid.Col>

        <Grid.Col span={4}>
          <Group position="right">
            <Pagination
              total={table.getPageCount()}
              onChange={(e) => {
                table.setPageIndex(e - 1);
              }}
            />
          </Group>
        </Grid.Col>
      </Grid>
      <MantineTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {isLoading ? (
                    <Skeleton height={28} />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </MantineTable>
    </div>
  );
}
