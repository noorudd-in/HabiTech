import { useColorTheme } from "../../hooks/useColorTheme";

const LockIcon = (props) => {
  const { customcolor } = useColorTheme();
  return (
    <div>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill={customcolor}
        viewBox="0 0 24 24"
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default LockIcon;
