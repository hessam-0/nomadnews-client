// docs https://www.neobrutalism.dev/react/components/modal
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function DeleteModal({ active, setActive, onConfirm }) {
  const [isVisible, setIsVisible] = useState(false);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  if (!active) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      data-visible={isVisible ? "true" : "false"}
      onClick={closeModal}
      className="fixed text-text left-0 top-0 z-50 flex h-screen w-screen items-center justify-center data-[visible=true]:opacity-100 data-[visible=true]:visible data-[visible=false]:opacity-0 data-[visible=false]:invisible transition-all duration-300 bg-overlay"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-[300px] group-data-[visible=true]:opacity-100 group-data-[visible=true]:visible group-data-[visible=false]:opacity-0 group-data-[visible=false]:invisible flex-col items-center justify-center rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-darkBg p-10 text-text dark:text-darkText pt-12 font-base shadow-light dark:shadow-dark transition-all duration-300"
      >
        <button onClick={closeModal}>
          <X className="absolute right-3 top-3 h-6 w-6" />
        </button>
        <h2 className="text-lg font-heading mb-4">Delete Comment?</h2>
        <p className="text-center mb-6">
          Are you sure you want to delete your magnum opus? It will be forever lost to the void of the web.
        </p>
        <div className="flex gap-4">
          <button
            className="cursor-pointer rounded-base border-2 text-text border-border dark:border-darkBorder bg-main px-4 py-1.5 font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer rounded-base border-2 text-red-500 border-red-500 dark:border-red-400 bg-main px-4 py-1.5 font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal"),
  );
}
