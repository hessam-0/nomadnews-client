import CommentCard from "./CommentCard";

export default function CommentList({ comments, onCommentDelete }) {
  return (
    <section className="flex flex-col gap-6">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} onCommentDelete={onCommentDelete} />
      ))}
    </section>
  );
}
