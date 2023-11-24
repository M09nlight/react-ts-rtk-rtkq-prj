import React, { FC } from "react";
import ArticleBanner from "../components/article-banner/ArticleBanner";
import Container from "../../../common/components/container/Container";
import TagList from "../components/tag-list/TagList";
import ArticleMeta from "../components/article-meta/ArticleMeta";
import { useGetSingleArticleQuery } from "../api/feedApi";
import { useParams } from "react-router-dom";
import CommentList from "../components/comment-list/CommentList";
import MDEditor from "@uiw/react-md-editor";

interface ArticlePageProps {}

const convertNewLines = (body: string) => {
  return body.split("\\n").join("<br />");
};

const ArticlePage: FC<ArticlePageProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetSingleArticleQuery({ slug: slug! });

  if (!data) {
    return <h1>Article not found</h1>;
  }
  if (isLoading) {
    return null;
  }
  return (
    <>
      <ArticleBanner
        title={data.article.title}
        author={data.article.author}
        likes={data.article.favoritesCount}
        publishedAt={data.article.createdAt}
        slug={slug!}
        isFavorited={data.article.favorited}
      />
      <Container>
        <div className="pb-8 border-b mb-6">
          <div data-color-mode="light">
            <MDEditor.Markdown
              source={convertNewLines(data.article.body)}
              className="text-articleBody leading-articleBody mb-8 bg-white"
            />
          </div>
          <TagList tagList={data.article.tagList} />
        </div>
        <div className="flex justify-center ">
          <ArticleMeta
            authorNameStyle="GREEN"
            author={data.article.author}
            publishedAt={data.article.createdAt}
            likes={data.article.favoritesCount}
            slug={slug!}
            isFavorited={data.article.favorited}
          />
        </div>
        <CommentList />
      </Container>
    </>
  );
};

export default ArticlePage;
