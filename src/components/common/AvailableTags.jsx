import Shimmer from "../../pages/Shimmer";
import { useColorTheme } from "../../hooks/useColorTheme";

const AvailableTags = ({ tagData, deleteIcon, handleDelete }) => {
  const { bgcolor100, border400, textcolor500 } = useColorTheme();
  if (!tagData) return <Shimmer />;

  return (
    <div>
      {tagData.map((tag) => {
        return (
          <span
            key={tag}
            className={`inline-block max-w-96 bg-gray-700 border ${border400} ${textcolor500} text-xs font-medium me-2 px-2 py-0.5 rounded-full `}
          >
            #{tag}{" "}
            {deleteIcon != undefined && (
              <button
                type="button"
                onClick={() => handleDelete(tag)}
                className={`inline-flex items-center p-1 ms-1 text-sm ${textcolor500} bg-transparent rounded-sm`}
              >
                <svg
                  className="w-2 h-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default AvailableTags;
