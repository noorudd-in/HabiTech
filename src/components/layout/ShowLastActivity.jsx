import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import dayjs from "dayjs";

const Activity = () => {
  const { state } = useContext(HabitechContext);
  return (
    <h1 className="text-center italic">
      Last Activity: {dayjs(state.lastEdited).format("DD MMM YYYY, hh:mm:ss A")}
    </h1>
  );
};

export default Activity;
