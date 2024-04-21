import { useColorTheme } from "../../hooks/useColorTheme";

const DownArrow = (props) => {
  const { customcolor } = useColorTheme();
  return (
    <div className="flex justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16"
        {...props}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <path
            d="M12 20L18 14M12 20L6 14M12 20L12 9.5M12 4V6.5"
            stroke={customcolor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default DownArrow;
