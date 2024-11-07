import { useState } from "react";
import { patchArticleVotes } from "../../api";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function VoteManager({ article_id, initialVotes }){
  const [voteModifier, setVoteModifier] = useState(0);
  const [error, setError] = useState(null);

  const manageVote = (newModifier) => {
    const exMod = voteModifier; //store initial state of modifier
    const voteChange = newModifier - voteModifier;

    setVoteModifier(newModifier); //optimistically update vote
    setError(null);

    patchArticleVotes(article_id, voteChange)
      .catch((err) => { 
        //revert optimistic update if patch fails
        setVoteModifier(exMod);
        setError("Failed to vote.")
      })
  }

  const toggleUpvote = () => {
    const newModifier = voteModifier === 1 ? 0 : 1;
    manageVote(newModifier);

  };

  const toggleDownvote = () => {
    const newModifier = voteModifier === -1 ? 0 : -1;
    manageVote(newModifier)
  };

  return(
    <div className="vote-buttons">
      <button
        onClick={toggleUpvote}
        className={voteModifier === 1 ? 'voting' : ''}>
        <ChevronUpIcon />
      </button>
      <span>{initialVotes + voteModifier}</span>
      <button
        onClick={toggleDownvote}
        className={voteModifier === -1 ? 'voting' : ''}>
        <ChevronDownIcon />
      </button>
      {error && <p className="error">{error}</p>}
    </div>
   );
};
