import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsForArticleQuery } from "../../api/feedApi";
import NewComment from "../new-comment/NewComment";
import CommentItem from "../comment-item/CommentItem";

interface CommentsListProps {}

const CommentsList: FC<CommentsListProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetCommentsForArticleQuery({ slug: slug! });

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (data?.comments.length === 0) {
    return (
      <div>
        <NewComment slug={slug!} />
        <p>No comments found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl	mx-auto mt-16 flex flex-col gap-3">
      <NewComment slug={slug!} />
      {data?.comments.map((comment) => (
        <CommentItem
          key={`comment-${comment.id}`}
          body={comment.body}
          author={comment.author}
          publishedAt={comment.createdAt}
          slug={slug!}
          commentId={comment.id}
        />
      ))}
    </div>
  );
};
export default CommentsList;
