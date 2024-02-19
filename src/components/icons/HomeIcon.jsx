const HomeIcon = ({ currentURL, navigate }) => {
  return (
    <button
      type="button"
      className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full ${
        currentURL == "/" ? "bg-gray-800 dark:hover:bg-gray-800" : ""
      } hover:bg-gray-800 dark:hover:bg-gray-800 group`}
      onClick={() => navigate("/")}
    >
      <svg
        className={`w-8 h-7 mb-1 ${
          currentURL == "/"
            ? "text-amber-500 dark:text-amber-500"
            : "text-gray-500 dark:text-amber-100"
        }  group-hover:text-amber-500 dark:group-hover:text-amber-500`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default HomeIcon;
