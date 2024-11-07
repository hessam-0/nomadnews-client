import { useEffect } from "react";
import { useState } from "react";
import { getArticles } from "../../api";
import  ArticleCard  from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import TopicsList from "./TopicsList";


export default function ArticleList() {
  const [articles, setArticles ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const topic = searchParams.get('topic');

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Something went wrong!");
        setIsLoading(false)
      });
  }, [topic]);

  if(isLoading){
    return <p>loading...</p>
  };

  if(error){
    return <p>Error: {error}</p>
  };

  return (
    <main className="articles-grid">
      <TopicsList />
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article={article}
            />
        ))}
    </main>
  );
};

