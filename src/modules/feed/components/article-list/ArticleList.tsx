import React, { FC } from "react";
import Article from "../article/Article";
import { FeedArticle } from "../../api/dto/global-feed.in";

interface ArticleListProps {
  feedArticleList: FeedArticle[];
}

const ArticleList: FC<ArticleListProps> = ({ feedArticleList }) => {
  return (
    <div>
      {feedArticleList.map((article, idx) => (
        <Article key={idx} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
