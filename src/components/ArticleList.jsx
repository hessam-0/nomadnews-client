import { useEffect } from "react";
import { useState } from "react";
import { getArticles } from "../../api";
import  ArticleCard  from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Something went wrong!");
        setIsLoading(false)
      });
  }, []);

  if(isLoading){
    return <p>loading...</p>
  };

  if(error){
    return <p>Error: {error}</p>
  };

  return (
    <main className="articles-grid">
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article={article}
            />
        ))}
    </main>
  );
};

