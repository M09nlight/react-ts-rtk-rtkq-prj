import React, { FC } from "react";
import { Author } from "../../api/dto/global-feed.in";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import clsx from "clsx";

export enum NameStyleEnum {
  GREEN = "GREEN",
  LIGHT = "LIGHT",
}
enum MetaDirectionEnum {
  ROW = "ROW",
  COL = "COL",
}

enum NameSizeEnum {
  SM = "SM",
  BASE = "BASE",
}

interface AuthorProps {
  author: Author;
  publishedAt: string;
  nameStyle?: keyof typeof NameStyleEnum;
  direction?: keyof typeof MetaDirectionEnum;
  nameSize?: keyof typeof NameSizeEnum;
}

export const ArticleAuthor: FC<AuthorProps> = ({
  author,
  publishedAt,
  nameStyle = NameStyleEnum.GREEN,
  direction = MetaDirectionEnum.COL,
  nameSize = NameSizeEnum.BASE,
}) => {
  const userNameClasses = clsx("font-medium", {
    "text-white hover:text-white": nameStyle === NameStyleEnum.LIGHT,
    "text-date": nameSize === NameSizeEnum.SM,
  });

  const metaClasses = clsx("mr-6 ml-0.3 leading-4 inline-flex ", {
    "flex-col": direction === MetaDirectionEnum.COL,
    "flex-row items-center gap-2": direction === MetaDirectionEnum.ROW,
  });

  const imgClasses = clsx("inline-block h-8 w-8 rounded-full", {
    "h-8 w-8": nameSize === NameSizeEnum.BASE,
    "h-5 w-5": nameSize === NameSizeEnum.SM,
  });

  return (
    <div className="flex">
      <Link to={`/${author.username}`}>
        <img
          src={author.image}
          alt={`${author.username} avatar`}
          className={imgClasses}
        />
      </Link>
      <div className={metaClasses}>
        <Link
          to={`/${encodeURIComponent(author.username)}`}
          className={userNameClasses}
        >
          {author.username}
        </Link>
        <span className="text-theme-gray-500 text-date">
          {DateTime.fromISO(publishedAt).toLocaleString(DateTime.DATE_FULL)}
        </span>
      </div>
    </div>
  );
};

export default ArticleAuthor;
