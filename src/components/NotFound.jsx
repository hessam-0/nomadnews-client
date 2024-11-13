import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      <div className="rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg p-8 shadow-light dark:shadow-dark max-w-md w-full text-center">
        <h1 className="font-heading text-4xl text-text dark:text-darkText mb-4">404</h1>
        <h2 className="font-heading text-2xl text-text dark:text-darkText mb-6">Page Not Found</h2>
        <p className="text-text dark:text-darkText mb-8 font-base">There was nothing for me here...</p>
        <Link
          to="/"
          className="inline-flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
