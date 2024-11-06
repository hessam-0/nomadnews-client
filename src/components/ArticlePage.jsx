import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getArticleById } from "../../api";
import CommentSection from "./CommentSection";
import VoteManager from "./VoteManager";

export default function ArticlePage(){
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
      })
    }, [article_id]);

  if(isLoading){
    return <p>Loading...</p>
  };

  if(error){
    return <p>Error: {error}</p>
  };

  return(
    <div className="page-container">
      <div className="content-container">
        <main className="main-content">
          <article className="article-container">
            <h1>{article.title}</h1>
              <p>Author: {article.author}</p>
              <p>{article.body}</p>
              <img
               src={article.article_img_url}
               alt={article.title}
              />
              <VoteManager
                article_id={article.article_id}
                initialVotes={article.votes}
              />
          </article>
          <CommentSection article_id={article_id}/>
        </main>
      </div>
    </div>
  );
};