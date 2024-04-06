import { useColorTheme } from "../../hooks/useColorTheme";

const CreateIcon = ({ navigate, currentURL, id }) => {
  const { customcolor } = useColorTheme();
  return (
    <>
      <button
        type="button"
        className={`inline-flex flex-col items-center justify-center px-5 ${
          currentURL == "/create" ? "bg-gray-800" : ""
        }`}
        onClick={() => navigate("/create")}
      >
        <svg
          id={id}
          className="w-10 h-10 mb-1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          fill="currentColor"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth={0} />
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="SVGRepo_iconCarrier">
            <title>{"plus-circle"}</title>
            <desc>{"Created with Sketch Beta."}</desc>
            <defs />
            <g
              id="Page-1"
              stroke="none"
              strokeWidth={1}
              fill="none"
              fillRule="evenodd"
              sketch:type="MSPage"
            >
              <g
                id="Icon-Set-Filled"
                sketch:type="MSLayerGroup"
                transform="translate(-466.000000, -1089.000000)"
                fill={customcolor}
              >
                <path
                  d="M488,1106 L483,1106 L483,1111 C483,1111.55 482.553,1112 482,1112 C481.447,1112 481,1111.55 481,1111 L481,1106 L476,1106 C475.447,1106 475,1105.55 475,1105 C475,1104.45 475.447,1104 476,1104 L481,1104 L481,1099 C481,1098.45 481.447,1098 482,1098 C482.553,1098 483,1098.45 483,1099 L483,1104 L488,1104 C488.553,1104 489,1104.45 489,1105 C489,1105.55 488.553,1106 488,1106 L488,1106 Z M482,1089 C473.163,1089 466,1096.16 466,1105 C466,1113.84 473.163,1121 482,1121 C490.837,1121 498,1113.84 498,1105 C498,1096.16 490.837,1089 482,1089 L482,1089 Z"
                  id="plus-circle"
                  sketch:type="MSShapeGroup"
                />
              </g>
            </g>
          </g>
        </svg>
      </button>
      {/*
    <button
      type="button"
      className={`inline-flex items-center justify-center w-10 h-10 font-medium ${
        currentURL == "/create" ? bgcolor500 : "bg-gray-500 " + bgcolor500
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
    */}
    </>
  );
};

export default CreateIcon;
