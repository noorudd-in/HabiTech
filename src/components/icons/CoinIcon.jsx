import { useColorTheme } from "../../hooks/useColorTheme";

const CoinIcon = () => {
  const { customcolor } = useColorTheme();
  return (
    <svg
      viewBox="-1.5 0 33 33"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
      fill={customcolor}
      className="w-6 h-7 pb-1"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <title>{"wallet"}</title>
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
            transform="translate(-259.000000, -776.000000)"
            fill={customcolor}
          >
            <path
              d="M283,799 L289,799 L289,797 L283,797 L283,799 Z M287,787 L259,787 L259,807 C259,808.104 259.896,809 261,809 L287,809 C288.104,809 289,808.104 289,807 L289,801 L282,801 C281.448,801 281,800.553 281,800 L281,796 C281,795.448 281.448,795 282,795 L289,795 L289,789 C289,787.896 288.104,787 287,787 L287,787 Z M287,778 C287,777.447 286.764,777.141 286.25,776.938 C285.854,776.781 285.469,776.875 285,777 L259,785 L287,785 L287,778 L287,778 Z"
              id="wallet"
              sketch:type="MSShapeGroup"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
export default CoinIcon;
