import { useColorTheme } from "../../hooks/useColorTheme";

const DragIcon = (props) => {
  const { customcolor } = useColorTheme();
  return (
    <div>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <rect width={24} height={24} />
          <circle
            cx={9.5}
            cy={6}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={9.5}
            cy={10}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={9.5}
            cy={14}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={9.5}
            cy={18}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={14.5}
            cy={6}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={14.5}
            cy={10}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={14.5}
            cy={14}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={14.5}
            cy={18}
            r={0.5}
            stroke={customcolor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default DragIcon;
