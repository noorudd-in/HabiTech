import { useColorTheme } from "../../hooks/useColorTheme";

const GoalsCategory = () => {
  const { bgcolor50 } = useColorTheme();
  return (
    <div>
      <label>Category: </label>
      <select
        name="goalsCategory"
        id="goalsCategory"
        className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
      >
        <option value="tag1">Show by Tag 1</option>
        <option value="tag2">Show by Tag 2</option>
        <option value="tag3">Show by Tag 3</option>
      </select>
    </div>
  );
};

export default GoalsCategory;
