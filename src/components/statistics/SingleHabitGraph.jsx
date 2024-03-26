import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import { useColorTheme } from "../../hooks/useColorTheme";
import AreaGraph from "../chart/AreaGraph";

const SingleHabitGraph = () => {
  const { state } = useContext(HabitechContext);
  const [chartData, setChartData] = useState(null);
  const [currentHabit, setCurrentHabit] = useState(0);
  const { bgcolor50 } = useColorTheme();

  const changeHabit = (index) => {
    setCurrentHabit(index);
    setChartData(state.habits[index].analytics);
  };

  useEffect(() => {
    setChartData(state.habits[0].analytics);
  }, []);

  if (chartData == null) return <Shimmer />;

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="mr-3">Showing chart for</h1>
        <select
          name="goalsCategory"
          id="goalsCategory"
          value={currentHabit}
          className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
          onChange={(e) => changeHabit(e.target.value)}
        >
          {state.habits.map((habit, ind) => {
            return (
              <option key={habit.id} value={ind}>
                {habit.name}
              </option>
            );
          })}
        </select>
      </div>
      <AreaGraph data={chartData} xkey={"count"} height={300} />
    </div>
  );
};

export default SingleHabitGraph;
