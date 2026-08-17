import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Loader from "../common/Loader";
import StatusBadge from "./StatusBadge";

/**
 * Generic admin data-table with search, pagination and status badges.
 *
 * @param {object[]}   rows                 – table data
 * @param {{key:string,label:string,width?:string,type?:string}[]} columns
 *     type "status" renders a StatusBadge; "image" renders an <img>;
 *     type "date" formats the value; otherwise raw value is rendered.
 * @param {object}     meta                 – { page, limit, total, totalPages }
 * @param {function}   onPageChange         – (page) => void
 * @param {function}   onSearch             – (term) => void
 * @param {function}   onStatusFilter       – (status) => void
 * @param {string[]}   statusOptions        – e.g. ["draft","published"]
 * @param {function}   onRowClick           – (row) => void
 * @param {string}     rowIdKey             – defaults to "_id"
 */
const AdminTable = ({
  columns,
  rows,
  meta,
  status,
  error,
  onPageChange,
  onSearch,
  onStatusFilter,
  statusOptions = [],
  onRowClick,
  rowIdKey = "_id",
}) => {
  const { page = 1, totalPages = 1, total = 0, limit = 10 } = meta || {};

  const handleSearch = (e) => {
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar: search + status filter */}
      {(onSearch || (onStatusFilter && statusOptions.length)) && (
        <div className="flex items-center gap-3">
          {onSearch && (
            <div className="relative flex-1 max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="w-full rounded-xl border border-line bg-slate-50 px-3 py-2 pl-9 text-sm text-ink placeholder-slate-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
              />
            </div>
          )}
          {onStatusFilter && statusOptions.length > 0 && (
            <select
              onChange={(e) => onStatusFilter(e.target.value || null)}
              defaultValue=""
              className="rounded-xl border border-line bg-slate-50 px-3 py-2 text-sm text-ink focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
            >
              <option value="">All statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
                    )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {status === "loading" && (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        )}
        {status === "error" && (
          <div className="p-4 text-sm text-red-600">{error}</div>
        )}
        {status === "success" && (
          <>
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
                      style={col.width ? { width: col.width } : undefined}
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr
                    key={row[rowIdKey]}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`hover:bg-slate-50 ${onRowClick ? "cursor-pointer" : ""}`}
                  >
                    {columns.map((col) => {
                      const val = row[col.key];
                      return (
                        <td key={col.key} className="px-4 py-3 text-sm">
                          {col.type === "status" ? (
                            <StatusBadge status={val} />
                          ) : col.type === "image" ? (
                            val ? (
                              <img
                                src={typeof val === "object" ? val.url : val}
                                alt=""
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="text-slate-400">—</span>
                            )
                          ) : col.type === "date" ? (
                            val ? new Date(val).toLocaleDateString() : "—"
                          ) : (
                            val ?? "—"
                          )}
                        </td>
                      );
                    })}
                    <td
                      className="px-4 py-3 text-right text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {row._actions}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length + 1}
                      className="px-4 py-8 text-center text-sm text-slate-500"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
                <p className="text-xs text-slate-500">
                  {total} record{total !== 1 ? "s" : ""} · page {page} of {totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPageChange?.(page - 1)}
                    disabled={page <= 1}
                    className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => onPageChange?.(page + 1)}
                    disabled={page >= totalPages}
                    className="rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminTable;
