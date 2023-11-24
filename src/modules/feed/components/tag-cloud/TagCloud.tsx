import React, { FC } from "react";
import TagList from "../tag-list/TagList";
import { useGetPopularTagsQuery } from "../../api/feedApi";

interface TagCloudProps {}

const TagCloud: FC<TagCloudProps> = () => {
  const { data, isLoading, isFetching, error } = useGetPopularTagsQuery("");

  if (isLoading || isFetching) {
    return (
      <div className="bg-theme-gray-100 p-3 pt-1.5">
        <p className="mb-2">Loading popular tags...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-theme-gray-100 p-3 pt-1.5">
        <p className="mb-2">Error while loading popular tags</p>
      </div>
    );
  }
  return (
    <div className="bg-theme-gray-100 p-3 pt-1.5">
      <span className="mb-2">Popular tags</span>
      <TagList tagList={data!.tags} itemStyle="DARK" itemAs="a" />
    </div>
  );
};

export default TagCloud;
