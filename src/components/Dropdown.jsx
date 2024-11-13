// docs https://www.neobrutalism.dev/react/components/dropdown //
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Dropdown({ items, text, onSelect, activeItem }) {
  const [isActiveDropdown, setIsActiveDropdown] = useState(false);

  return (
    <div data-state={isActiveDropdown ? "open" : "closed"} className="relative group text-text">
      <button
        aria-haspopup="listbox"
        aria-expanded={isActiveDropdown}
        onBlur={() => {
          setIsActiveDropdown(false);
        }}
        onClick={() => {
          setIsActiveDropdown(!isActiveDropdown);
        }}
        className="flex h-9 w-[120px] cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
      >
        <div className="mx-auto flex items-center">
          {activeItem || text}
          <ChevronDown
            className={
              "ml-2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0 ease-in-out"
            }
          />
        </div>
      </button>
      <div
        role="listbox"
        className="absolute left-0 w-[120px] overflow-x-hidden group-data-[state=open]:top-[42px] group-data-[state=open]:opacity-100 group-data-[state=closed]:invisible group-data-[state=closed]:top-[50px] group-data-[state=closed]:opacity-0 group-data-[state=open]:visible rounded-base border-2 border-border dark:border-darkBorder text-center font-base shadow-light dark:shadow-dark transition-all"
      >
        {items.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                onSelect(item.value);
                setIsActiveDropdown(false);
              }}
              className="block w-full border-b-2 border-border dark:border-darkBorder bg-main px-4 py-2 hover:bg-mainAccent"
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
