import { FC } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../favorite-button/FavoriteButton";
import TagList from "../tag-list/TagList";
import { FeedArticle } from "../../api/dto/global-feed.in";
import ArticleAuthor from "../article-author/ArticleAuthor";

interface ArticleProps {
  article: FeedArticle;
}

const Article: FC<ArticleProps> = ({ article }) => {
  return (
    <article>
      <div className="border-t border-black/10 py-6">
        <div className="mb-4 font-light flex justify-between">
          <ArticleAuthor
            author={article.author}
            publishedAt={article.createdAt}
          />
          <FavoriteButton
            count={article.favoritesCount}
            slug={article.slug}
            isFavorited={article.favorited}
          />
        </div>
        <Link
          to={`/article/${encodeURIComponent(article.slug)}`}
          className=" hover:no-underline"
        >
          <h1 className="mb-1 font-semibold text-2xl text-theme-gray-1000">
            {article.description}
          </h1>
          <p className="text-theme-gray-700 font-light mb-1">{article.title}</p>
          <div className="flex justify-between">
            <span className="text-theme-gray-500 text-date font-light">
              Read More
            </span>
            <TagList tagList={article.tagList} />
          </div>
        </Link>
      </div>
    </article>
  );
};

export default Article;
