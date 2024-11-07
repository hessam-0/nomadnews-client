import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/16/solid";

export default function SortControls({ sort_by, order, onSortChange }){
  return(
    <div className="sort-controls">
      <select value={sort_by} onChange={(e) => onSortChange(e.target.value, order)}>
         <option value="created_at">Date</option>
         <option value="comment_count">Comments</option>
         <option value="votes">Votes</option>
      </select>
      <button onClick={() => onSortChange(sort_by, order === 'asc' ? 'desc' : 'asc')}>
        {order === 'asc' ? <ArrowUpIcon/> : <ArrowDownIcon/>}
      </button>
    </div>
  );
};