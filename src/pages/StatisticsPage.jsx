import { useContext, useEffect, useState, lazy, Suspense } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
const DailyHabitsGoal = lazy(() =>
  import("../components/statistics/DailyHabitsGoal")
);
const HabitCategoryGraph = lazy(() =>
  import("../components/statistics/HabitCategoryGraph")
);
const GoalsTypeGraph = lazy(() =>
  import("../components/statistics/GoalsTypeGraph")
);
const GoalsPriorityGraph = lazy(() =>
  import("../components/statistics/GoalsPriorityGraph")
);
const SingleHabitGraph = lazy(() =>
  import("../components/statistics/SingleHabitGraph")
);
import { useColorTheme } from "../hooks/useColorTheme";
import Shimmer from "./Shimmer";

const StatisticsPage = () => {
  const { state } = useContext(HabitechContext);
  const [singleHabitGraph, setSigleHabitGraph] = useState(true);
  const [dailyHabitsGoal, setDailyHabitsGoal] = useState(false);
  const [habitCategoryGraph, setHabitCategoryGraph] = useState(false);
  const [goalsTypeGraph, setGoalsTypeGraph] = useState(false);
  const [goalsPriorityGraph, setGoalsPriorityGraph] = useState(false);
  const { textcolor500, border400 } = useColorTheme();
  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
  }, []);
  return (
    <div className="mb-24 mt-10">
      <div
        className="mx-5"
        onClick={() => setSigleHabitGraph(!singleHabitGraph)}
      >
        <h1
          className={`text-center text-2xl font-semibold ${textcolor500} border-b-2 ${border400}`}
        >
          SINGLE GOAL ANALYSIS
        </h1>
      </div>
      {singleHabitGraph && (
        <Suspense fallback={<Shimmer />}>
          <p className="text-center text-sm italic font-thin mb-5">
            View detailed analysis of each habit.
          </p>
          <SingleHabitGraph />
        </Suspense>
      )}

      <div
        className="mt-5 mx-5"
        onClick={() => setDailyHabitsGoal(!dailyHabitsGoal)}
      >
        <h1
          className={`text-center text-2xl font-semibold ${textcolor500} border-b-2 ${border400}`}
        >
          HABITS VS GOALS
        </h1>
      </div>
      {dailyHabitsGoal && (
        <Suspense fallback={<Shimmer />}>
          <p className="text-center text-sm italic font-thin mb-5 mx-5">
            View how many habits and goals you have completed in past 90 days.
          </p>
          <DailyHabitsGoal />
        </Suspense>
      )}

      <div
        className="mt-5 mx-5"
        onClick={() => setHabitCategoryGraph(!habitCategoryGraph)}
      >
        <h1
          className={`text-center text-2xl font-semibold ${textcolor500} border-b-2 ${border400}`}
        >
          HABITS (DIFFICULTY)
        </h1>
      </div>
      {habitCategoryGraph && (
        <Suspense fallback={<Shimmer />}>
          <p className="text-center text-sm italic font-thin mb-5 mx-5">
            View total number of completed habits based on difficulty level.
          </p>
          <HabitCategoryGraph />
        </Suspense>
      )}

      <div
        className="mt-5 mx-5"
        onClick={() => setGoalsTypeGraph(!goalsTypeGraph)}
      >
        <h1
          className={`text-center text-2xl font-semibold ${textcolor500} border-b-2 ${border400}`}
        >
          GOALS (TYPE)
        </h1>
      </div>
      {goalsTypeGraph && (
        <Suspense fallback={<Shimmer />}>
          <p className="text-center text-sm italic font-thin mb-5 mx-5">
            View total number of completed goals based on types.
          </p>
          <GoalsTypeGraph />
        </Suspense>
      )}

      <div
        className="mt-5 mx-5"
        onClick={() => setGoalsPriorityGraph(!goalsPriorityGraph)}
      >
        <h1
          className={`text-center text-2xl font-semibold ${textcolor500} border-b-2 ${border400}`}
        >
          GOALS (PRIORITY)
        </h1>
      </div>
      {goalsPriorityGraph && (
        <Suspense fallback={<Shimmer />}>
          <p className="text-center text-sm italic font-thin mb-5 mx-5">
            View total number of completed goals based on priority.
          </p>
          <GoalsPriorityGraph />
        </Suspense>
      )}
    </div>
  );
};

export default StatisticsPage;
