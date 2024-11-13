import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../../api";
import CommentSection from "./CommentSection";
import VoteManager from "./VoteManager";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Something went wrong!");
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="max-w-6xl mx-auto">
        <article className="rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg p-6 shadow-light dark:shadow-dark mb-8">
          <header className="mb-6">
            <h1 className="text-3xl font-heading text-text dark:text-darkText mb-4">{article.title}</h1>
            <div className="flex flex-wrap gap-4 text-text dark:text-darkText font-base mb-4">
              <p>
                <span className="font-heading">Author: </span>
                {article.author}
              </p>
              <p>
                <span className="font-heading">Topic: </span>
                {article.topic}
              </p>
              <p>
                <span className="font-heading">Posted:</span> {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
            <VoteManager article_id={article.article_id} initialVotes={article.votes} />
          </header>
          <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-auto rounded-base mb-6 object-cover"
            />
            <p className="text-text dark:text-darkText whitespace-pre-wrap">{article.body}</p>
          </div>
        </article>
        <CommentSection article_id={article_id} />
      </main>
    </div>
  );
}
