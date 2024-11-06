export default function CommentCard({ comment }){
  return(
    <article className="comment-card">
      <header className="comment-header">
        <div>
          <span>{comment.author}</span>
          <span>{new Date(comment.created_at).toLocaleDateString()}</span>
        </div>
        <div>
          <span>Votes: {comment.votes}</span>
        </div>
      </header>
      <p className="comment-body">{comment.body}</p>
    </article>
  );
};