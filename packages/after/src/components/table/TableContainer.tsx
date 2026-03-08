import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

interface TableContainerProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean; // Note: Bordered implementation in UI might need adjustment if true
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;

  // Domain Concerns
  entityType?: "user" | "post";
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const TableContainer: React.FC<TableContainerProps> = ({
  columns,
  data = [],
  striped = false,
  hover = true,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return newDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return newDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData =
    searchable && searchTerm
      ? tableData.filter((row) =>
          Object.values(row).some((val) =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        )
      : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns =
    columns ||
    (tableData[0]
      ? Object.keys(tableData[0]).map((key) => ({
          key,
          header: key,
          width: undefined,
        }))
      : []);

  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    if (entityType === "user") {
      if (columnKey === "role") {
        const roleVariantMap: Record<string, any> = {
          admin: "danger",
          moderator: "warning",
          user: "primary",
          guest: "secondary",
        };
        const labelMap: Record<string, string> = {
          admin: "관리자",
          moderator: "운영자",
          user: "사용자",
          guest: "게스트",
        };
        return (
          <Badge variant={roleVariantMap[value as string] || "primary"}>
            {labelMap[value as string] || value}
          </Badge>
        );
      }
      if (columnKey === "status") {
        const statusVariantMap: Record<string, any> = {
          active: "success",
          inactive: "warning",
          rejected: "danger",
        };
        const statusLabelMap: Record<string, string> = {
          active: "활성",
          inactive: "비활성",
          rejected: "거부됨",
        };
        return (
          <Badge variant={statusVariantMap[value as string] || "secondary"}>
            {statusLabelMap[value as string] || value}
          </Badge>
        );
      }
      if (columnKey === "actions") {
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete?.(row.id)}
            >
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === "post") {
      if (columnKey === "category") {
        const typeMap: Record<string, any> = {
          development: "primary",
          design: "info",
          accessibility: "danger",
        };
        return (
          <Badge variant={typeMap[value as string] || "secondary"} pill>
            {value}
          </Badge>
        );
      }
      if (columnKey === "status") {
        const statusMap: Record<string, any> = {
          published: "success",
          draft: "warning",
          archived: "secondary",
          pending: "info",
          rejected: "danger",
        };
        const labelMap: Record<string, string> = {
          published: "게시됨",
          draft: "임시저장",
          archived: "보관됨",
          pending: "대기중",
          rejected: "거부됨",
        };
        return (
          <Badge variant={statusMap[value as string] || "secondary"}>
            {labelMap[value as string] || value}
          </Badge>
        );
      }
      if (columnKey === "views") {
        return value?.toLocaleString() || "0";
      }
      if (columnKey === "actions") {
        return (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === "draft" && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === "published" && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === "archived" && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button
              size="sm"
              variant="danger"
              onClick={() => onDelete?.(row.id)}
            >
              삭제
            </Button>
          </div>
        );
      }
    }

    if (React.isValidElement(value)) return value;
    return value;
  };

  return (
    <div className="flex flex-col gap-4">
      {searchable && (
        <div className="flex justify-start">
          <input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px] rounded-[4px] border border-neutral-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            {actualColumns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                className={sortable ? "cursor-pointer select-none" : ""}
                onClick={() => sortable && handleSort(column.key)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span className="text-[10px]">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              striped={striped}
              hover={hover}
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? "cursor-pointer" : ""}
            >
              {actualColumns.map((column) => (
                <TableCell key={column.key}>
                  {entityType ? renderCell(row, column.key) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            이전
          </Button>
          <div className="flex items-center px-3 text-sm font-medium">
            {currentPage} / {totalPages}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
