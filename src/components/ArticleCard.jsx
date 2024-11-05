export default function ArticleCard({ article }) {
  return(
    <article className="article-card">
      <img
        src={article.article_img_url}
        alt={`${article.title}`}
      />
      <h2>{article.title}</h2>
      <p>Topic: {article.topic}</p>
      <p>Author: {article.author}</p>
      <p>Votes: {article.votes}</p>
    </article>
  );
};