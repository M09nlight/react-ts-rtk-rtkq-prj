import React, { ComponentProps, FC } from "react";
import { FaPlus } from "react-icons/fa";
import Button, {
  ButtonStyleEnum,
} from "../../../../common/components/button/Button";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../api/profileApi";
import { useAuth } from "../../../auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../core/routes";

interface FollowButtonProps {
  username: string;
  btnStyle?: ComponentProps<typeof Button>["btnStyle"];
  isFollowed: boolean;
}

const FollowButton: FC<FollowButtonProps> = ({
  username,
  isFollowed,
  btnStyle = ButtonStyleEnum.DARK,
}) => {
  const [triggerFollow] = useFollowUserMutation();
  const [triggerUnfollow] = useUnfollowUserMutation();
  const auth = useAuth();
  const navigate = useNavigate();

  const toggleFollow = () => {
    if (!auth.isLoggedIn) {
      navigate(routes.signIn.path);
      return;
    }
    if (!isFollowed) {
      triggerFollow({ username: encodeURIComponent(username) });
    } else {
      triggerUnfollow({ username: encodeURIComponent(username) });
    }
  };

  return (
    <Button btnStyle={btnStyle} onClick={toggleFollow}>
      <FaPlus className="mr-2" /> {isFollowed ? "Unfollow" : "Follow"}{" "}
      {username}
    </Button>
  );
};

export default FollowButton;
