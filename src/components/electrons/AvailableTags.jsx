import Shimmer from "../../pages/Shimmer";

const AvailableTags = ({ tagData }) => {
  if (!tagData) return <Shimmer />;

  return (
    <div className="text-center text-2xl mt-2 break-words text-wrap whitespace-normal">
      <h1>Available Tags</h1>
      <div>
        {tagData.map((tag) => {
          return (
            <span
              key={tag}
              className="inline-block max-w-96 bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
            >
              #{tag}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableTags;
