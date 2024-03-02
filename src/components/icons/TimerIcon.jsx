import { useColorTheme } from "../../hooks/useColorTheme";

const TimerIcon = ({ currentURL, navigate }) => {
  const { textcolor500, darktextcolor100 } = useColorTheme();
  return (
    <button
      type="button"
      className={`inline-flex flex-col items-center justify-center px-5 ${
        currentURL == "/pomodoro" ? "bg-gray-800" : ""
      }`}
      onClick={() => navigate("/pomodoro")}
    >
      <svg
        className={`w-8 h-7 mb-1 ${
          currentURL == "/pomodoro"
            ? textcolor500
            : `text-gray-500 ${darktextcolor100}`
        }`}
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
