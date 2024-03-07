import { useState } from "react";
import ToggleButton from "../electrons/ToggleButton";
import GoalsCategory from "../electrons/GoalsCategory";

const GoalsHeader = ({ showTask, setShowTask }) => {
  return (
    <>
      <div className="flex justify-between mt-5 mx-5">
        <ToggleButton
          showTask={showTask}
          setShowTask={setShowTask}
          name="Show Subtask"
        />
        <GoalsCategory />
      </div>
    </>
  );
};

export default GoalsHeader;
