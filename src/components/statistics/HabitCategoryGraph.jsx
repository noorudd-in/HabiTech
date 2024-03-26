import { useContext, useEffect, useState } from "react";
import BarGraph from "../chart/BarGraph";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
const HabitCategoryGraph = () => {
  const [chartData, setChartData] = useState(null);
  const { state } = useContext(HabitechContext);
  useEffect(() => {
    const habits = state.user.analytics.habits;
    const data = [
      {
        name: "Easy",
        value: habits.easy[1],
      },
      {
        name: "Decent",
        value: habits.decent[1],
      },
      {
        name: "Hard",
        value: habits.hard[1],
      },
    ];
    setChartData(data);
  }, []);

  if (chartData == null) return <Shimmer />;
  return (
    <div>
      <BarGraph data={chartData} xlabel={"name"} bar1={"value"} />
    </div>
  );
};

export default HabitCategoryGraph;
