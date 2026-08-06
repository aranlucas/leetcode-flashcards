import {
  columnFilteringFeature,
  columnSizingFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  filterFns,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";

export const features = tableFeatures({
  columnFilteringFeature,
  columnSizingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
});

export type TableFeatureSet = typeof features;
