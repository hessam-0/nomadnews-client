import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getArticles(topic, sort_by, order)
      .then((articlesData) => {
        setArticles(articlesData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Something went wrong!");
        setIsLoading(false);
      });
  }, [topic, sort_by, order]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <main className="container mx-auto px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <section className="flex flex-col gap-3 md:gap-4 py-4 md:py-6">
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </section>
      </div>
    </main>
  );
}
