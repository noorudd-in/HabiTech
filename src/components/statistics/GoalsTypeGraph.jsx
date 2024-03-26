import { useContext, useEffect, useState } from "react";
import BarGraph from "../chart/BarGraph";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";

const GoalsTypeGraph = () => {
  const [chartData, setChartData] = useState(null);
  const { state } = useContext(HabitechContext);

  useEffect(() => {
    const goals = state.user.analytics.goals;
    const data = [
      {
        name: "Short-Term",
        value: goals.short[1],
      },
      {
        name: "Mid-Term",
        value: goals.mid[1],
      },
      {
        name: "Long-Term",
        value: goals.long[1],
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

export default GoalsTypeGraph;
