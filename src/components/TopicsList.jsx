import { useState, useEffect } from "react";
import { getTopics } from "../../api";
import { Link } from "react-router-dom";

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
        setError(err.response?.data?.msg || err.msg || "Failed to load topics.")
        setIsLoading(false);
      });
  }, []);

  if(isLoading){
    return <p>Loading...</p>;
  };

  if(error){
    return <p>Error: {error}</p>;
  };

  return (
    <nav className="topics-nav">
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/articles?topic=${topic.slug}`}>
              {topic.slug}
            </Link>
          </li>
         ))}
      </ul>
    </nav>
  );
};