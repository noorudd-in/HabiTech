import ToggleButton from "../common/ToggleButton";
import GroupByGoals from "../layout/GroupByGoals";

const GoalsHeader = ({ showTask, setShowTask, groupBy, setGroupBy }) => {
  return (
    <>
      <div className="flex justify-between mt-5 mx-5">
        <ToggleButton
          toggle={showTask}
          setToggle={setShowTask}
          name="Show Subtask"
        />
        <GroupByGoals groupBy={groupBy} setGroupBy={setGroupBy} />
      </div>
    </>
  );
};

export default GoalsHeader;
