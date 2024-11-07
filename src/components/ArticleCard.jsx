import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return(
    <Link to={`/articles/${article.article_id}`}>
      <article className="article-card">
        <img
          src={article.article_img_url}
          alt={`${article.title}`}
         />
         <h2>{article.title}</h2>
         <p>Topic: {article.topic}</p>
         <p>Author: {article.author}</p>
         <p>Votes: {article.votes}</p>
         <p>Comments: {article.comment_count}</p>
         <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
      </article>
    </Link>
  );
};