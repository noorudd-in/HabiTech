import { useColorTheme } from "../../hooks/useColorTheme";

const GroupByGoals = ({ groupBy, setGroupBy }) => {
  const { bgcolor50 } = useColorTheme();

  return (
    <div>
      <label>Group By: </label>
      <select
        name="goalsCategory"
        id="goalsCategory"
        value={groupBy}
        className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
        onChange={(e) => setGroupBy(e.target.value)}
      >
        <option value="timeline">Timeline</option>
        <option value="priority">Priority</option>
        <option value="tags">Tags</option>
      </select>
    </div>
  );
};

export default GroupByGoals;
