import clsx from "clsx";
import React, { FC } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

interface FeedToggleItem {
  text: string;
  link: string;
}

interface FeedToggleProps {
  defaultText?: string;
  defaultLink?: string;
  items?: FeedToggleItem[];
}

const FeedToggle: FC<FeedToggleProps> = ({
  defaultText = "Global Feed",
  defaultLink = "/",
  items = [],
}) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag");

  const globalFeedClasses = ({ isActive }: { isActive: boolean }) => {
    return clsx("bg-white border-theme-green py-2 px-4 hover:no-underline", {
      "text-black/30 hover:text-black/60": tag || !isActive,
      "border-b-2 ": !tag && isActive,
    });
  };

  return (
    <div className="h-8">
      <ul>
        <li>
          <NavLink to={defaultLink} className={globalFeedClasses} end>
            {defaultText}
          </NavLink>
          {items.map((item, idx) => (
            <NavLink to={item.link} className={globalFeedClasses} key={idx}>
              {item.text}
            </NavLink>
          ))}
          {tag && (
            <span className="bg-white border-b-2 border-theme-green py-2 px-4 text-theme-green">
              # {tag}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
};

export default FeedToggle;
