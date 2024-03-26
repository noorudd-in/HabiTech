import { lazy, useContext, useEffect, useState } from "react";
const BarGraph = lazy(() => import("../chart/BarGraph"));
import { HabitechContext } from "../../contexts/HabitechContext";
import RightIcon from "../icons/RightIcon";
import LeftIcon from "../icons/LeftIcon";
import Shimmer from "../../pages/Shimmer";
import dayjs from "dayjs";
import StackedBarGraph from "../chart/StackedBarGraph";

const DailyHabitsGoal = () => {
  const [chartData, setChartData] = useState(null);
  const [page, setPage] = useState(0);
  const { state } = useContext(HabitechContext);

  let today = dayjs();
  const get90DaysObj = () => {
    let obj = [];
    for (let i = 0; i <= 90; i++) {
      let newDate = today.subtract(i, "day").format("DD MMM");
      obj.push(newDate);
    }
    return obj;
  };

  const getChartData = (start, end) => {
    let result = get90DaysObj();
    let sevenDayData = result.slice(start, end);
    let updatedData = sevenDayData.map((date) => {
      let tempObj = { date: date, habit: 0, goal: 0 };
      if (state.user.analytics.habits.records[date]) {
        tempObj.habit = state.user.analytics.habits.records[date];
      }
      if (state.user.analytics.goals.records[date]) {
        tempObj.goal = state.user.analytics.goals.records[date];
      }
      return tempObj;
    });
    return updatedData;
  };

  const changeWeek = (type) => {
    setPage(page + type);
  };

  useEffect(() => {
    let res = getChartData(page * 7, page * 7 + 7);
    res.reverse();
    setChartData(res);
  }, [page]);

  if (chartData == null) return <Shimmer />;

  return (
    <div>
      <div className="flex justify-center mb-3">
        {page < 12 ? (
          <div onClick={() => changeWeek(1)}>
            <LeftIcon className="w-7 h-7 text-white" />
          </div>
        ) : (
          <div className="w-7"></div>
        )}

        <h1 className="font-semibold text-lg">
          {chartData[0].date} - {chartData[6].date}
        </h1>

        {page > 0 ? (
          <div onClick={() => changeWeek(-1)}>
            <RightIcon className="w-7 h-7 text-white" />
          </div>
        ) : (
          <div className="w-7"></div>
        )}
      </div>
      <StackedBarGraph
        data={chartData}
        xlabel={"date"}
        bar1={"habit"}
        bar2={"goal"}
      />
    </div>
  );
};

export default DailyHabitsGoal;
