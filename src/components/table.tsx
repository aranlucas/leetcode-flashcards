import {
  Group,
  Pagination,
  Skeleton,
  Table as MantineTable,
} from "@mantine/core";
import {
  useTable,
  flexRender,
  type ColumnDef,
  type RowData,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { features, type TableFeatureSet } from "./table-features";

interface TableProps<T extends RowData> {
  items: T[];
  columnDefinitions: Array<ColumnDef<TableFeatureSet, T, any>>;
  isLoading?: boolean;
}

export default function Table<T extends RowData>({
  items,
  columnDefinitions,
  isLoading,
}: TableProps<T>) {
  const data = useMemo(() => items, [items]);
  const columns = useMemo(() => columnDefinitions, [columnDefinitions]);

  const table = useTable({
    features,
    data,
    columns,
  });

  return (
    <div>
      <Group justify="flex-end">
        <Pagination
          total={table.getPageCount()}
          onChange={(e) => {
            table.setPageIndex(e - 1);
          }}
        />
      </Group>
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
              {row.getAllCells().map((cell) => (
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
