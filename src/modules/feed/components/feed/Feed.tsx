import React, { FC } from "react";
import ArticleList from "../article-list/ArticleList";
import { FeedData } from "../../api/feedApi";
import ReactPaginate from "react-paginate";
import { FEED_PAGE_SIZE } from "../../consts";
import { usePageParam } from "../../hooks/use-page-params";

interface FeedProps {
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  data?: FeedData;
}

const Feed: FC<FeedProps> = ({ isLoading, isFetching, error, data }) => {
  const { page, setPage } = usePageParam();

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected);
  };

  if (isLoading || isFetching) {
    return <p className="mt-4">Feed loading...</p>;
  }
  if (error) {
    return <p className="mt-4">Error while loading feed</p>;
  }

  if (data?.articlesCount === 0) {
    return <p className="mt-4">No articles are here.. yet.</p>;
  }

  return (
    <>
      {!!data && (
        <>
          <ArticleList feedArticleList={data.articles} />
          <nav className="my-6">
            <ReactPaginate
              pageCount={Math.ceil(data.articlesCount / FEED_PAGE_SIZE)}
              pageRangeDisplayed={data.articlesCount / FEED_PAGE_SIZE}
              previousLabel={null}
              nextLabel={null}
              containerClassName="flex "
              pageClassName="group"
              pageLinkClassName="p-3 text-theme-green bg-white border border-theme-gray-300 -ml-px group-[&:nth-child(2)]:rounded-l hover:bg-theme-gray-200 group-[&:nth-last-child(2)]:rounded-r"
              activeClassName="active group"
              activeLinkClassName="group-[.active]:bg-theme-green group-[.active]:text-white group-[.active]:border-theme-green"
              onPageChange={handlePageChange}
              forcePage={page}
            />
          </nav>
        </>
      )}
    </>
  );
};

export default Feed;
