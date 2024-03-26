import React from "react";

const RightIcon = (props) => {
  return (
    <div>
      <svg
        {...props}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M10.3 5.6A2 2 0 0 0 7 7v10a2 2 0 0 0 3.3 1.5l5.9-4.9a2 2 0 0 0 0-3l-6-5Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default RightIcon;
