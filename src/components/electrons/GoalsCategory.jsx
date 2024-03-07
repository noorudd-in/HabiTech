import { useColorTheme } from "../../hooks/useColorTheme";

const GoalsCategory = () => {
  const { bgcolor50 } = useColorTheme();
  return (
    <div>
      <label>Group By: </label>
      <select
        name="goalsCategory"
        id="goalsCategory"
        className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
      >
        <option value="timelime">Timeline</option>
        <option value="priority">Priority</option>
        <option value="tags">Tags</option>
      </select>
    </div>
  );
};

export default GoalsCategory;
