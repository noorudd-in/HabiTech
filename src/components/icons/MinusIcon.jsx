const MinusIcon = ({ className }) => {
  return (
    <div>
      <svg
        className={`${className} w-7 h-7 text-gray-800`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14"
        />
      </svg>
    </div>
  );
};

export default MinusIcon;
