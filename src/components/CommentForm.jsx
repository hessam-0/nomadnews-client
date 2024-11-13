import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { postComment } from "../../api";
import { Filter } from "bad-words";

export default function CommentForm({ article_id, onCommentSubmit }) {
  const { loggedInUser } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const profanityFilter = new Filter();

  const commentGatekeeper = (comment) => {
    switch (true) {
      case !comment.trim():
        return "Comment cannot be empty";

      case comment.length > 250:
        return "Comment must be under 250 characters";

      case comment.trim().length < 3:
        return "Comment must be at least 3 characters long";

      case !/[a-z]/i.test(comment):
        return "Comment must contain letters";

      case /SELECT|INSERT|UPDATE|DELETE|DROP|UNION/.test(comment):
        return "This is not the place for discussing SQL";

      default:
        return profanityFilter.isProfane(comment) ? profanityFilter.clean(comment) : comment;
    }
  };

  const manageSubmit = (e) => {
    e.preventDefault();

    const clearedComment = commentGatekeeper(commentBody);

    if (typeof clearedComment === "string" && clearedComment !== commentBody) {
      setError(clearedComment);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    postComment(article_id, loggedInUser.username, clearedComment)
      .then((newComment) => {
        setCommentBody("");
        onCommentSubmit(newComment);
        setIsSubmitting(false);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || err.msg || "Commenting failed, try again later.");
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={manageSubmit} className="mb-8">
      <textarea
        className="w-full h-[150px] bg-white dark:bg-darkBg resize-none rounded-base border-2 border-border dark:border-darkBorder p-4 font-base text-text dark:text-darkText ring-offset-white dark:ring-offset-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2 mb-4"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        placeholder="Speak your mind..."
        disabled={isSubmitting}
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-light dark:disabled:hover:shadow-dark"
      >
        {isSubmitting ? "Posting..." : "Post Comment"}
      </button>
      {error && <p className="mt-2 text-red-500 dark:text-red-400">{error}</p>}
    </form>
  );
}
