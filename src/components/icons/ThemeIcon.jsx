import { useColorTheme } from "../../hooks/useColorTheme";
const ThemeIcon = (props) => {
  const { customcolor } = useColorTheme();
  return (
    <div>
      <svg
        fill={customcolor}
        viewBox="0 0 24 24"
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
          <path d="M22,7V9a3,3,0,0,1-3,3H14a1,1,0,0,0-1,1h1a1,1,0,0,1,1,1v7a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1h1a3,3,0,0,1,3-3h5a1,1,0,0,0,1-1V7a1,1,0,0,0-1-1H17.816A2.99,2.99,0,0,1,15,8H5A3,3,0,0,1,5,2H15a2.99,2.99,0,0,1,2.816,2H19A3,3,0,0,1,22,7ZM3.7,16h.6A1.891,1.891,0,0,0,6,13.963a2.324,2.324,0,0,0-.325-1.2L4,10,2.325,12.764A2.324,2.324,0,0,0,2,13.963,1.891,1.891,0,0,0,3.7,16Z" />
        </g>
      </svg>
    </div>
  );
};

export default ThemeIcon;
