// docs https://www.neobrutalism.dev/react/components/image-card //
import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <Link
      to={`/articles/${article.article_id}`}
      className="block hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
    >
      <article className="flex flex-row h-24 sm:h-32 md:h-auto md:flex-col rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg font-base shadow-light dark:shadow-dark overflow-hidden">
        <div className="w-1/3 md:w-full md:h-48 flex-shrink-0">
          <img className="w-full h-full object-cover" src={article.article_img_url} alt={article.title} />
        </div>

        <div className="w-2/3 md:w-full p-2 sm:p-3 md:p-4 flex flex-col justify-between">
          <div>
            <h2 className="font-heading text-sm sm:text-base md:text-xl text-text dark:text-darkText line-clamp-2 mb-1 sm:mb-2">
              {article.title}
            </h2>

            <div className="flex flex-wrap gap-2 text-xs sm:text-sm md:text-base text-text dark:text-darkText opacity-75">
              <p>
                <span className="font-heading">Topic: </span>
                {article.topic}
              </p>
              <p className="hidden md:block">
                <span className="font-heading">Author: </span>
                {article.author}
              </p>
            </div>
          </div>

          <div className="flex gap-3 text-xs sm:text-sm md:text-base text-text dark:text-darkText mt-1">
            <p title="Comments">
              <span className="font-heading">💬</span>
              {article.comment_count}
            </p>
            <p title="Votes">
              <span className="font-heading">👍</span>
              {article.votes}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
