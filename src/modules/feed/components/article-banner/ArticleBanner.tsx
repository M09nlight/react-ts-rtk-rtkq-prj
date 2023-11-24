import React, { FC } from "react";
import Container from "../../../../common/components/container/Container";
import ArticleMeta from "../article-meta/ArticleMeta";
import { Author } from "../../api/dto/global-feed.in";

interface ArticleBannerProps {
  title: string;
  author: Author;
  likes: number;
  publishedAt: string;
  slug: string;
  isFavorited: boolean;
}

const ArticleBanner: FC<ArticleBannerProps> = ({
  title,
  author,
  likes,
  publishedAt,
  slug,
  isFavorited,
}) => {
  return (
    <div className="bg-theme-gray-1100 pt-8 pb-4 mb-8">
      <Container>
        <h1 className="text-white text-articleTitle font-semibold leading-articleTitle mb-8">
          {title}
        </h1>
        <ArticleMeta
          author={author}
          likes={likes}
          publishedAt={publishedAt}
          slug={slug}
          isFavorited={isFavorited}
        />
      </Container>
    </div>
  );
};

export default ArticleBanner;