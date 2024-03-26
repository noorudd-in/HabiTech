import { useContext, useEffect, useState } from "react";
import BarGraph from "../chart/BarGraph";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";

const GoalsPriorityGraph = () => {
  const [chartData, setChartData] = useState(null);
  const { state } = useContext(HabitechContext);

  useEffect(() => {
    const goals = state.user.analytics.goals;
    const data = [
      {
        name: "High Priority",
        value: goals.high[1],
      },
      {
        name: "Medium Priority",
        value: goals.medium[1],
      },
      {
        name: "Low Priority",
        value: goals.low[1],
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

export default GoalsPriorityGraph;
