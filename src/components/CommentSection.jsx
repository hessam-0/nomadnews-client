import { useEffect, useState} from "react";
import { getComments } from "../../api";
import CommentList from "./CommentList";

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

  if(isLoading){
    return <p>Loading...</p>
  };

  if(error){
    return <p>Error: {error}</p>
  };

  return(
    <section className="comment-section">
        <h2>Comments({comments.length})</h2>
        <CommentList comments={comments}/>
    </section>
  );
};