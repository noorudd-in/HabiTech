import React from "react";

const TimerIcon = ({ currentURL, navigate }) => {
  return (
    <button
      type="button"
      className={`inline-flex flex-col items-center justify-center px-5 ${
        currentURL == "/pomodoro" ? "bg-gray-800 dark:hover:bg-gray-800" : ""
      } hover:bg-gray-800 dark:hover:bg-gray-800 group`}
      onClick={() => navigate("/pomodoro")}
    >
      <svg
        className={`w-8 h-7 mb-1 ${
          currentURL == "/pomodoro"
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
          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default TimerIcon;
