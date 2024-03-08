import { useState } from "react";
import ToggleButton from "../electrons/ToggleButton";
import GroupByGoals from "../electrons/GroupByGoals";

const GoalsHeader = ({ showTask, setShowTask, groupBy, setGroupBy }) => {
  return (
    <>
      <div className="flex justify-between mt-5 mx-5">
        <ToggleButton
          showTask={showTask}
          setShowTask={setShowTask}
          name="Show Subtask"
        />
        <GroupByGoals groupBy={groupBy} setGroupBy={setGroupBy} />
      </div>
    </>
  );
};

export default GoalsHeader;
