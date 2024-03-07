import Shimmer from "../../pages/Shimmer";

const AvailableTags = ({ tagData }) => {
  if (!tagData) return <Shimmer />;

  return (
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
  );
};

export default AvailableTags;
