import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import SingleHabit from "../electrons/SingleHabit";

const RenderHabits = () => {
  const { state, dispatch } = useContext(HabitechContext);

  return (
    <div className="mt-5">
      {state.habits.map(({ id, name, status, difficulty, tags }) => {
        return (
          <SingleHabit
            key={id}
            id={id}
            name={name}
            status={status}
            difficulty={difficulty}
            tags={tags}
          />
        );
      })}
    </div>
  );
};

export default RenderHabits;
