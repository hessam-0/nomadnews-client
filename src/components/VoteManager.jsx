import { useState } from "react";
import { patchArticleVotes } from "../../api";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function VoteManager({ article_id, initialVotes }){
  const [voteModifier, setVoteModifier] = useState(0);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  const toggleUpvote = () => {
    const newModifier = voteModifier === 1 ? 0 : 1;
    const voteChange = newModifier - voteModifier;

    setIsVoting(true);
    setError(null);

    patchArticleVotes(article_id, voteChange)
      .then(() => {
        setVoteModifier(newModifier);
        setIsVoting(false);
      })
      .catch((err)=> {
        setError("Failed to Upvote.")
        setIsVoting(false);
      });
  };

  const toggleDownvote = () => {
    const newModifier = voteModifier === -1 ? 0 : -1;
    const voteChange = newModifier - voteModifier;

    setIsVoting(true);
    setError(null);

    patchArticleVotes(article_id, voteChange)
      .then(() => {
        setVoteModifier(newModifier);
        setIsVoting(false);
      })
      .catch((err)=> {
        setError("Failed to Downvote.")
        setIsVoting(false);
      });
  };

  return(
    <div className="vote-buttons">
      <button
        onClick={toggleUpvote}
        disabled={isVoting}
        className={voteModifier === 1 ? 'voting' : ''}>
        <ChevronUpIcon />
      </button>
      <span>{initialVotes + voteModifier}</span>
      <button
        onClick={toggleDownvote}
        disabled={isVoting}
        className={voteModifier === -1 ? 'voting' : ''}>
        <ChevronDownIcon />
      </button>
      {error && <p className="error">{error}</p>}
    </div>
   );
};
