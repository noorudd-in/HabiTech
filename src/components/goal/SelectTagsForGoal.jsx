import { useColorTheme } from "../../hooks/useColorTheme";

const SelectTagsForGoal = ({ allTags, tags, setTags }) => {
  const { checkboxcolor } = useColorTheme();
  const handleTags = (currentTag) => {
    let updatedTags = [...tags];
    if (updatedTags.includes(currentTag)) {
      updatedTags = updatedTags.filter((singleTag) => {
        return singleTag != currentTag;
      });
    } else {
      updatedTags.push(currentTag);
    }
    setTags(updatedTags);
  };
  return (
    <>
      <div className="mt-1 bg-white rounded-lg shadow dark:bg-gray-700">
        <p className="mx-2">Select from the list available tags.</p>
        {allTags.map((tag) => {
          return (
            <ul
              key={tag}
              className="px-4 py-0.5 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
            >
              <li>
                <div className="items-center rounded">
                  <input
                    id={tag}
                    type="checkbox"
                    value={tag}
                    className={`bg-gray-100 border-gray-300 ${checkboxcolor}`}
                    onChange={(e) => handleTags(e.target.value)}
                    checked={tags.includes(tag) ? "checked" : ""}
                  />
                  <label
                    htmlFor={tag}
                    className="w-full ms-2 text-base font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    {tag}
                  </label>
                </div>
              </li>
            </ul>
          );
        })}
        <p className="mx-2 mt-2">
          To create a new tag, go to 'Create Tag' button from homepage.
        </p>
      </div>
    </>
  );
};

export default SelectTagsForGoal;
