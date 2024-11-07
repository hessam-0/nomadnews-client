import { useEffect, useState} from "react";
import { getComments } from "../../api";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { deleteComment } from "../../api";

export default function CommentSection({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

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
    const commentForDeletion = comments.filter(comment => comment.comment_id === commentId);
    const remainingComments = comments.filter(comments => comments.comment_id !== commentId);

    setComments(remainingComments);

    deleteComment(commentId)
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Failed to delete comment.")
        setComments((currentComments) => [...currentComments, ...commentForDeletion])
        setIsLoading(false);
      });
  };

  if(isLoading){
    return <p>Loading...</p>
  };

  if(error){
    return <p>Error: {error}</p>
  };

  return(
    <section className="comment-section">
        <h2>Comments({comments.length})</h2>
          <CommentForm
            article_id={article_id}
            onCommentSubmit={manageNewComment}
          />
        <CommentList comments={comments} onCommentDelete={manageDeleteComment}/>
    </section>
  );
};