import { useState } from "react";
import ToggleButton from "../electrons/ToggleButton";
import GoalsCategory from "../electrons/GoalsCategory";

const GoalsHeader = () => {
  const [showToggle, setShowToggle] = useState(true);
  return (
    <>
      <div className="flex justify-between mt-5 mx-5">
        <ToggleButton
          showToggle={showToggle}
          setShowToggle={setShowToggle}
          name="Show Details"
        />
        <GoalsCategory />
      </div>
    </>
  );
};

export default GoalsHeader;
