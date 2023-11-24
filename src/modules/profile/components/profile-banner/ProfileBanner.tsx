import React, { FC } from "react";
import Container from "../../../../common/components/container/Container";
import FollowButton from "../follow-button/FollowButton";
import { Profile } from "../../api/dto/get-profile.in";
import { useAuth } from "../../../auth/hooks/use-auth";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../common/components/button/Button";
import { routes } from "../../../../core/routes";

interface ProfileBannerProps {
  profile: Profile;
}

const ProfileBanner: FC<ProfileBannerProps> = ({ profile }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const gotToSettings = () => {
    navigate(routes.settings.path);
  };

  return (
    <div className="bg-theme-gray-100 pt-8 pb-4 mb-8">
      <Container>
        <div>
          <img
            src={profile.image}
            alt={`${profile.username} avatar`}
            className="w-25 h-25 rounded-full mx-auto mb-4"
          />
          <h2 className="text-center font-bold text-2xl">{profile.username}</h2>
        </div>
        <div className="flex justify-end">
          {user?.username !== profile.username ? (
            <FollowButton
              username={profile.username}
              isFollowed={profile.following}
            />
          ) : (
            <Button onClick={gotToSettings}>Edit profile settings</Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProfileBanner;
