import React, { FC } from "react";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../../auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../../core/routes";
import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from "../../api/feedApi";
import Button from "../../../../common/components/button/Button";

interface FavoriteButtonProps {
  count: number;
  extended?: boolean;
  slug: string;
  isFavorited: boolean;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  count,
  extended = false,
  slug,
  isFavorited = false,
}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [triggerFavoriteMutation, favoriteMutationState] =
    useFavoriteArticleMutation();
  const [triggerUnfavoriteMutation, unfavoriteMutationState] =
    useUnfavoriteArticleMutation();

  const handleFavoriteClick = async () => {
    if (!isLoggedIn) {
      navigate(routes.signIn.path);
      return;
    }

    if (isFavorited) {
      await triggerUnfavoriteMutation({ slug });
    } else {
      await triggerFavoriteMutation({ slug });
    }
  };
  return (
    <Button
      btnStyle="GREEN"
      variant={isFavorited ? "BASE" : "OUTLINE"}
      onClick={handleFavoriteClick}
      disabled={
        favoriteMutationState.isLoading || unfavoriteMutationState.isLoading
      }
    >
      <div className="flex items-center">
        <FaHeart />
        <span className="ml-1 font-normal">
          {extended && "Favorite Article ("}
          {count}
          {extended && ")"}
        </span>
      </div>
    </Button>
  );
};

export default FavoriteButton;
