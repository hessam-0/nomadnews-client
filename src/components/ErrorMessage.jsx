export default function ErrorMessage({ error }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg p-6 shadow-light dark:shadow-dark max-w-md w-full text-center">
        <h2 className="font-heading text-xl text-text dark:text-darkText mb-4">Oh no! Something went wrong</h2>
        <p className="text-red-500 dark:text-red-400 font-base">{error || "An unexpected error occurred"}</p>
      </div>
    </div>
  );
}
