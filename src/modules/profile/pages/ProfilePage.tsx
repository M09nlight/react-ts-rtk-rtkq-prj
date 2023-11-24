import React, { FC } from "react";
import ProfileBanner from "../components/profile-banner/ProfileBanner";
import Feed from "../../feed/components/feed/Feed";
import { useGetProfileFeedQuery } from "../../feed/api/feedApi";
import { useLocation, useParams } from "react-router-dom";
import { usePageParam } from "../../feed/hooks/use-page-params";
import Container from "../../../common/components/container/Container";
import FeedToggle from "../../feed/components/feed-toggle/FeedToggle";
import { useGetProfileQuery } from "../api/profileApi";

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = () => {
  const { page } = usePageParam();
  const { profile } = useParams();
  const { pathname } = useLocation();

  const { data: profileInfo, isLoading: profileLoading } = useGetProfileQuery({
    username: profile!,
  });
  const { data, isLoading, isFetching, error } = useGetProfileFeedQuery({
    page,
    author: profile!,
    isFavorite: pathname.includes(`/${encodeURIComponent(profile!)}/favorites`),
  });

  const feedToggleItems = [
    {
      text: "Favorited articles",
      link: `/${encodeURIComponent(profile!)}/favorites`,
    },
  ];

  if (profileLoading) {
    return null;
  }
  return (
    <>
      <ProfileBanner profile={profileInfo!.profile} />
      <Container>
        <FeedToggle
          defaultText="My Articles"
          defaultLink={`/${profile}`}
          items={feedToggleItems}
        />
        <Feed
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          error={error}
        />
      </Container>
    </>
  );
};

export default ProfilePage;
