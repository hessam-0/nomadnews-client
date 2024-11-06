import CommentsVoteManager from "./CommentsVoteManager";

export default function CommentCard({ comment }){
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
        </div>
      </header>
      <p className="comment-body">{comment.body}</p>
    </article>
  );
};