import { useState } from "react";
import ToggleButton from "../electrons/ToggleButton";
import RenderAvailableTags from "../electrons/RenderAvailableTags";

const GoalsHeader = () => {
  const [showToggle, setShowToggle] = useState(true);
  return (
    <div>
      <ToggleButton
        showToggle={showToggle}
        setShowToggle={setShowToggle}
        name="Show Details"
      />
      <RenderAvailableTags />
    </div>
  );
};

export default GoalsHeader;
