import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/16/solid";

export default function SortControls({ sort_by, order, onSortChange }) {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <select
        value={sort_by}
        onChange={(e) => onSortChange(e.target.value, order)}
        className="rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 cursor-pointer shadow-light dark:shadow-dark hover:translate-y-[-2px] transition-all"
      >
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
        <option value="votes">Votes</option>
      </select>

      <button
        onClick={() => onSortChange(sort_by, order === "asc" ? "desc" : "asc")}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-main shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
        aria-label={`Sort ${order === "asc" ? "descending" : "ascending"}`}
      >
        {order === "asc" ? <ArrowUpIcon className="h-5 w-5" /> : <ArrowDownIcon className="h-5 w-5" />}
      </button>
    </div>
  );
}
