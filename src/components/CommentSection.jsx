import { useEffect, useState } from "react";
import { getComments, deleteComment } from "../../api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

export default function CommentSection({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getComments(article_id)
      .then((commentsData) => {
        setComments(commentsData);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Something went wrong.");
        setIsLoading(false);
      });
  }, [article_id]);

  const manageNewComment = (newComment) => {
    setComments((currentComments) => [newComment, ...currentComments]);
  };

  const manageDeleteComment = (commentId) => {
    const originalComments = [...comments];
    const remainingComments = comments.filter((comments) => comments.comment_id !== commentId);

    setComments(remainingComments);
    setDeleteError(null);

    deleteComment(commentId).catch((err) => {
      setComments(originalComments);
      setDeleteError(err.response?.data?.msg || err.msg || "Failed to delete comment.");
      console.log("Delete error state set to:", err.response?.data?.msg || err.msg || "Failed to delete comment.");
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="mt-8 p-4 rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg">
      <h2 className="text-xl font-heading text-text dark:text-darkText mb-6">Comments ({comments.length})</h2>

      {error ? (
        <div className="mb-4">
          <ErrorMessage error={error} />
        </div>
      ) : null}
      {deleteError ? (
        <div className="mb-4">
          <ErrorMessage error={deleteError} />
        </div>
      ) : null}

      <div className="mb-8">
        <CommentForm article_id={article_id} onCommentSubmit={manageNewComment} />
      </div>

      {comments.length > 0 ? (
        <CommentList comments={comments} onCommentDelete={manageDeleteComment} />
      ) : (
        <p className="text-text dark:text-darkText">No comments yet</p>
      )}
    </section>
  );
}
