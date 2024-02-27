const CreateIcon = ({ navigate, currentURL }) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center w-10 h-10 font-medium ${
        currentURL == "/create"
          ? "bg-amber-500"
          : "bg-gray-500 dark:bg-amber-100"
      } rounded-full`}
      onClick={() => navigate("/create")}
    >
      <svg
        className={`w-4 h-4 ${
          currentURL == "/create" ? "text-black" : "text-white dark:text-black"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 1v16M1 9h16"
        />
      </svg>
    </button>
  );
};

export default CreateIcon;
