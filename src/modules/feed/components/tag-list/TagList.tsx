import clsx from "clsx";
import React, { FC } from "react";
import { Link } from "react-router-dom";

enum TagListStyle {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

interface TagListProps {
  tagList: string[];
  itemStyle?: keyof typeof TagListStyle;
  itemAs?: "li" | "a";
}

const TagList: FC<TagListProps> = ({
  tagList,
  itemStyle = TagListStyle.LIGHT,
  itemAs = "li",
}) => {
  const itemClasses = clsx(
    "font-light text-date border mr-1 mb-0.2 px-tag rounded-tag",
    {
      "border-theme-gray-300 text-theme-gray-600":
        itemStyle === TagListStyle.LIGHT,
      "bg-theme-gray-800 text-white border-theme-gray-800 hover:bg-theme-gray-900":
        itemStyle === TagListStyle.DARK,
      "hover:text-white hover:no-underline":
        itemStyle === TagListStyle.DARK && itemAs === "a",
    }
  );

  return (
    <ul className="flex flex-wrap">
      {tagList.map((tag, idx) =>
        itemAs === "li" ? (
          <li key={idx} className={itemClasses}>
            {tag}
          </li>
        ) : (
          <Link to={`/?tag=${tag}`} key={idx} className={itemClasses}>
            {tag}
          </Link>
        )
      )}
    </ul>
  );
};

export default TagList;
