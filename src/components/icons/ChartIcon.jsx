import { useColorTheme } from "../../hooks/useColorTheme";

const ChartIcon = ({ currentURL, navigate, id }) => {
  const { textcolor500, darktextcolor100 } = useColorTheme();
  return (
    <button
      type="button"
      className={`inline-flex flex-col items-center justify-center px-5 ${
        currentURL == "/statistics" ? "bg-gray-800" : ""
      }`}
      onClick={() => navigate("/statistics")}
    >
      <svg
        id={id}
        className={`w-8 h-7 mb-1 ${
          currentURL == "/statistics"
            ? textcolor500
            : `text-gray-500 ${darktextcolor100}`
        }  `}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
        <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
      </svg>
    </button>
  );
};

export default ChartIcon;
