import { FC } from "react";
import Banner from "../../../common/components/banner/Banner";
import Feed from "../components/feed/Feed";
import { useLocation, useMatch, useSearchParams } from "react-router-dom";
import { useGetGlobalFeedQuery } from "../api/feedApi";
import { usePageParam } from "../hooks/use-page-params";
import Container from "../../../common/components/container/Container";
import FeedToggle from "../components/feed-toggle/FeedToggle";
import TagCloud from "../components/tag-cloud/TagCloud";
import { useAuth } from "../../auth/hooks/use-auth";
import { routes } from "../../../core/routes";

interface GlobalFeedPageProps {}

const GlobalFeedPage: FC<GlobalFeedPageProps> = () => {
  const { isLoggedIn } = useAuth();
  const personalFeed = useMatch(routes.personalFeed.path);
  console.log(personalFeed);

  const [searchParams] = useSearchParams();
  const { page } = usePageParam();

  const { data, isLoading, isFetching, error } = useGetGlobalFeedQuery({
    page: page,
    tag: searchParams.get("tag"),
    isPersonalFeed: personalFeed !== null,
  });

  const feedToggleItems = [];
  if (isLoggedIn) {
    feedToggleItems.push({
      text: "Your feed",
      link: "/personal-feed",
    });
  }

  return (
    <>
      {!isLoggedIn && <Banner />}

      <Container>
        <FeedToggle items={feedToggleItems} />
        <div className="flex">
          <div className="w-3/4 pl-3">
            <Feed
              data={data}
              error={error}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </div>
          <div className="w-1/4 pl-3">
            <TagCloud />
          </div>
        </div>
      </Container>
    </>
  );
};

export default GlobalFeedPage;
