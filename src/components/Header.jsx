import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { getTopics } from "../../api";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/16/solid";
import Tabs from "./Tabs";
import Dropdown from "./Dropdown";

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const currentTopic = searchParams.get("topic") || "All";

  const sortOptions = [
    { name: "Date", value: "created_at" },
    { name: "Comments", value: "comment_count" },
    { name: "Votes", value: "votes" },
  ];

  const getSortDisplayName = (value) => {
    return sortOptions.find((option) => option.value === value)?.name || "Sort By";
  };

  useEffect(() => {
    getTopics().then((topicsData) => {
      setTopics(["All", ...topicsData.map((t) => t.slug)]);
    });
  }, []);

  const handleSortChange = (newSort, newOrder) => {
    setSearchParams((params) => {
      const newParams = new URLSearchParams(params);
      newParams.set("sort_by", newSort);
      newParams.set("order", newOrder);
      return newParams;
    });
  };

  const handleTopicChange = (topic) => {
    if (topic === "All") {
      navigate("/articles");
    } else {
      navigate(`/articles?topic=${topic.toLowerCase()}`);
    }
  };

  return (
    <header className="bg-bg dark:bg-darkBg border-b-2 border-border dark:border-darkBorder">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center h-12">
            <Link to="/" className="font-heading text-text dark:text-darkText hover:text-main transition-colors">
              Nomad News
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-text dark:text-darkText hover:text-main transition-colors">
                Home
              </Link>
              <span className="text-text dark:text-darkText">Hey {loggedInUser.username}</span>
              <button
                onClick={toggleTheme}
                className="p-2 bg-bg dark:bg-darkBg border-2 border-border dark:border-darkBorder rounded-base shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          <div className="flex gap-2 py-2">
            <div className="flex-1">
              <Tabs tabsArray={topics} activeTab={currentTopic} setActiveTab={handleTopicChange} />
            </div>

            <div className="flex gap-2">
              <Dropdown
                items={sortOptions}
                text="Sort By"
                activeItem={getSortDisplayName(sort_by)}
                onSelect={(value) => handleSortChange(value, order)}
              />
              <button
                onClick={() => handleSortChange(sort_by, order === "asc" ? "desc" : "asc")}
                className="flex h-9 w-9 items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-main shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
                aria-label={`Sort ${order === "asc" ? "descending" : "ascending"}`}
              >
                {order === "asc" ? (
                  <ArrowUpIcon className="h-4 w-4 text-text" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-text" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
