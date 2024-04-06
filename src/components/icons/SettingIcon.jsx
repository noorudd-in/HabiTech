import { useColorTheme } from "../../hooks/useColorTheme";

const SettingIcon = ({ currentURL, navigate, id }) => {
  const { textcolor500, darktextcolor100 } = useColorTheme();
  return (
    <button
      type="button"
      className={`inline-flex flex-col items-center justify-center px-5 rounded-e-full ${
        currentURL == "/setting" ? "bg-gray-800" : ""
      }`}
      onClick={() => navigate("/setting")}
    >
      <svg
        id={id}
        className={`w-8 h-7 mb-1 ${
          currentURL == "/setting"
            ? textcolor500
            : `text-gray-500 ${darktextcolor100}`
        }  `}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M9.6 2.6A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2l.5.3a2 2 0 0 1 2.9 0l1.4 1.3a2 2 0 0 1 0 2.9l.1.5h.1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2l-.3.5a2 2 0 0 1 0 2.9l-1.3 1.4a2 2 0 0 1-2.9 0l-.5.1v.1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2l-.5-.3a2 2 0 0 1-2.9 0l-1.4-1.3a2 2 0 0 1 0-2.9l-.1-.5H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2l.3-.5a2 2 0 0 1 0-2.9l1.3-1.4a2 2 0 0 1 2.9 0l.5-.1V4c0-.5.2-1 .6-1.4ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default SettingIcon;
