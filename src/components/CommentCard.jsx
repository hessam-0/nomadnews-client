import CommentsVoteManager from "./CommentsVoteManager";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { TrashIcon } from "@heroicons/react/16/solid";
import DeleteModal from "./DeleteModal";

export default function CommentCard({ comment, onCommentDelete }) {
  const { loggedInUser } = useContext(UserContext);
  const [deleteModalActive, setDeleteModalActive] = useState(false);

  const manageDelete = () => {
    onCommentDelete(comment.comment_id);
  };

  return (
    <article className="rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg p-4 font-base shadow-light dark:shadow-dark mb-4">
      <header className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <p className="text-text dark:text-darkText font-heading">{comment.author}</p>
          <p className="text-sm text-text dark:text-darkText opacity-75">
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CommentsVoteManager comment_id={comment.comment_id} initialVotes={comment.votes} />

          {loggedInUser.username === comment.author && (
            <button
              onClick={() => setDeleteModalActive(true)}
              aria-label="Delete comment"
              className="flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main p-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>
      <p className="text-text dark:text-darkText whitespace-pre-wrap">{comment.body}</p>
      <DeleteModal active={deleteModalActive} setActive={setDeleteModalActive} onConfirm={manageDelete} />
    </article>
  );
}
