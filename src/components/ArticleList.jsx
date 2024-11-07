import { useEffect } from "react";
import { useState } from "react";
import { getArticles } from "../../api";
import  ArticleCard  from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import TopicsList from "./TopicsList";
import SortControls from "./SortControls";

export default function ArticleList() {
  const [articles, setArticles ] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get('topic');
  const sort_by = searchParams.get('sort_by') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, sort_by, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Something went wrong!");
        setIsLoading(false)
      });
  }, [topic, sort_by, order]);

  const manageSort = (newSort, newOrder) => {
    setSearchParams(params => {
      const newParams = new URLSearchParams(params);
      newParams.set('sort_by', newSort);
      newParams.set('order', newOrder);
      return newParams;
    });
  };

  if(isLoading){
    return <p>loading...</p>
  };

  if(error){
    return <p>Error: {error}</p>
  };

  return (
    <main className="articles-grid">
      <TopicsList />
      <SortControls 
        sort_by={sort_by}
        order={order}
        onSortChange={manageSort}
      />
      {articles.map((article) => (
        <ArticleCard
          key={article.article_id}
          article={article}
            />
        ))}
    </main>
  );
};

