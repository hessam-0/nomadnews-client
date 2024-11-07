import CommentsVoteManager from "./CommentsVoteManager";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { TrashIcon } from "@heroicons/react/16/solid";


export default function CommentCard({ comment, onCommentDelete }){
  const { loggedInUser } = useContext(UserContext);

  const manageDelete = () => {
    if(window.confirm("Are you sure about this?")){
      onCommentDelete(comment.comment_id);
    }
  };

  return(
    <article className="comment-card">
      <header className="comment-header">
         <div>
           <span>{comment.author}</span>
           <span>{new Date(comment.created_at).toLocaleDateString()}</span>
           </div>
           <div>
          <CommentsVoteManager
            comment_id={comment.comment_id}
            initialVotes={comment.votes}
          />
          {loggedInUser.username === comment.author && (
          <button className="delete-button" onClick={manageDelete}>
            <TrashIcon />
          </button>
        )}
        </div>
      </header>
      <p className="comment-body">{comment.body}</p>
    </article>
  );
};