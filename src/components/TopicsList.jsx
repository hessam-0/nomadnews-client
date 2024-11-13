import { useState, useEffect } from "react";
import { getTopics } from "../../api";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function TopicsList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((topicsData) => {
        setTopics(topicsData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Failed to load topics.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <nav className="mb-4 md:mb-8 px-2 md:px-4">
      <ul className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center gap-2 md:gap-4 pb-2 md:pb-0">
        <li className="flex-shrink-0">
          <Link
            to="/articles"
            className="block rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-base text-text dark:text-darkText shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
          >
            All
          </Link>
        </li>
        {topics.map((topic) => (
          <li key={topic.slug} className="flex-shrink-0">
            <Link
              to={`/articles?topic=${topic.slug}`}
              className="block rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-base text-text dark:text-darkText shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
            >
              {topic.slug}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
