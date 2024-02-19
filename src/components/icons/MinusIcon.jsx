const MinusIcon = ({ className, status }) => {
  return (
    <div>
      <svg
        className={`${className} w-7 h-7 text-gray-800 ${
          status == "completed" ? "text-amber-400" : "text-black"
        }`}
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
