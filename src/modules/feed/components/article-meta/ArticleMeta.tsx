import React, { ComponentProps, FC } from "react";
import ArticleAuthor, { NameStyleEnum } from "../article-author/ArticleAuthor";
import FavoriteButton from "../favorite-button/FavoriteButton";
import FollowButton from "../../../profile/components/follow-button/FollowButton";
import { Author } from "../../api/dto/global-feed.in";
import { useAuth } from "../../../auth/hooks/use-auth";
import Button from "../../../../common/components/button/Button";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteArticleMutation } from "../../api/feedApi";
import { toast } from "react-toastify";

interface ArticleMetaProps {
  authorNameStyle?: ComponentProps<typeof ArticleAuthor>["nameStyle"];
  authorDirection?: ComponentProps<typeof ArticleAuthor>["direction"];
  authorNameSize?: ComponentProps<typeof ArticleAuthor>["nameSize"];
  author: Author;
  publishedAt: string;
  slug: string;
  isFavorited: boolean;
  likes?: number;
  showActionButtons?: boolean;
}

const ArticleMeta: FC<ArticleMetaProps> = ({
  authorNameStyle = NameStyleEnum.LIGHT,
  author,
  likes,
  slug,
  publishedAt,
  showActionButtons = true,
  authorDirection,
  authorNameSize,
  isFavorited,
}) => {
  const auth = useAuth();
  const [triggerArticleMutation, { isLoading }] = useDeleteArticleMutation();
  const navigate = useNavigate();
  const navigateToEdit = () => {
    navigate(`/editor/${slug}`);
  };
  const deleteArticle = async () => {
    try {
      await triggerArticleMutation({ slug });
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <div className="inline-block">
        <ArticleAuthor
          author={author}
          publishedAt={publishedAt}
          nameStyle={authorNameStyle}
          direction={authorDirection}
          nameSize={authorNameSize}
        />
      </div>
      {showActionButtons && (
        <div className="inline-flex gap-4">
          {auth.user?.username === author.username ? (
            <>
              <Button onClick={navigateToEdit}>
                <CiEdit className="mr-2" /> Edit Article
              </Button>
              <Button btnStyle="DANGER" onClick={deleteArticle}>
                <FaRegTrashAlt className="mr-2" /> Delete Article
              </Button>
            </>
          ) : (
            <>
              <FollowButton
                username={author.username}
                btnStyle="LIGHT"
                isFollowed={author.following}
              />
              <FavoriteButton
                count={likes || 0}
                extended
                slug={slug}
                isFavorited={isFavorited}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleMeta;
