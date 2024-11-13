import { useState } from "react";
import { patchArticleVotes } from "../../api";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

export default function VoteManager({ article_id, initialVotes }) {
  const [voteModifier, setVoteModifier] = useState(0);
  const [error, setError] = useState(null);

  const manageVote = (newModifier) => {
    const exMod = voteModifier; //store initial state of modifier
    const voteChange = newModifier - voteModifier;

    setVoteModifier(newModifier); //optimistically update vote
    setError(null);

    patchArticleVotes(article_id, voteChange).catch((err) => {
      //revert optimistic update if patch fails
      setVoteModifier(exMod);
      setError("Failed to vote.");
    });
  };

  const toggleUpvote = () => {
    const newModifier = voteModifier === 1 ? 0 : 1;
    manageVote(newModifier);
  };

  const toggleDownvote = () => {
    const newModifier = voteModifier === -1 ? 0 : -1;
    manageVote(newModifier);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleUpvote}
        aria-label="Upvote comment"
        className={`flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main p-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none ${
          voteModifier === 1 ? "ring-2 ring-black dark:ring-white" : ""
        }`}
      >
        <ChevronUpIcon className="h-4 w-4" />
      </button>
      <span className="text-text dark:text-darkText min-w-[2rem] text-center font-heading">
        {initialVotes + voteModifier}
      </span>
      <button
        onClick={toggleDownvote}
        aria-label="Downvote comment"
        className={`flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main p-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none ${
          voteModifier === -1 ? "ring-2 ring-black dark:ring-white" : ""
        }`}
      >
        <ChevronDownIcon className="h-4 w-4" />
      </button>
      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
    </div>
  );
}
