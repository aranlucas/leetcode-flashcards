"use client";

import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import Table from "../../components/table";
import { type TableFeatureSet } from "../../components/table-features";

interface FileItem {
  data: { title: string; slug: string };
}

interface LeetcodeListProps {
  files: FileItem[];
}

export default function LeetcodeList({ files }: LeetcodeListProps) {
  const columnHelper = createColumnHelper<TableFeatureSet, FileItem>();

  const columns = [
    columnHelper.accessor("data.title", {
      header: () => "Title",
      cell: (info) => (
        <Link
          href={`/leetcode/${(info.row.original.data.slug ?? "").toString()}`}
        >
          {info.getValue()}
        </Link>
      ),
    }),
  ];

  return <Table items={files} columnDefinitions={columns} />;
}
