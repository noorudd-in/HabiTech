import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import PlannersHeader from "./PlannersHeader";
import SinglePlan from "./SinglePlan";
import dayjs from "dayjs";
import PlanWrapper from "./PlanWrapper";
import Shimmer from "../../pages/Shimmer";
import axios from "axios";
import { API_URL } from "../../constants";

const RenderPlanner = () => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);
  const [toggleData, setToggleData] = useState("today");
  const [planData, setPlanData] = useState(null);
  const [olderData, setOlderData] = useState(null);

  let today = dayjs();
  let yesterday = today.subtract(1, "day");
  let tomorrow = today.add(1, "day");

  // Function to get status. Past plan: -1, Present Plan: 0, Future Plan: 1
  const getStatus = (startTime, endTime) => {
    const currentDate = Date.now();
    const startDate = new Date();
    const endDate = new Date();
    let startArr = startTime.split(":");
    let endArr = endTime.split(":");
    startDate.setHours(parseInt(startArr[0]));
    startDate.setMinutes(parseInt(startArr[1]));
    endDate.setHours(parseInt(endArr[0]));
    endDate.setMinutes(parseInt(endArr[1]));

    if (currentDate > endDate.getTime()) {
      return -1;
    }
    if (currentDate < startDate.getTime()) {
      return 1;
    }

    if (
      currentDate >= startDate.getTime() &&
      currentDate <= endDate.getTime()
    ) {
      return 0;
    }
  };

  const sortByDay = () => {
    //First sort all the plans by time
    let sortedByTime = state?.plans?.toSorted((a, b) => {
      return a.start.localeCompare(b.start);
    });

    // Track if the plan is older than yesterday.
    let flag = false;
    let older = [];
    let updatedData = {
      [yesterday.date()]: [],
      [today.date()]: [],
      [tomorrow.date()]: [],
    };

    sortedByTime.map((plan) => {
      let date = new Date(plan.date);
      if (updatedData[date.getDate()]) {
        updatedData[date.getDate()].push(plan);
      } else {
        flag = true;
        older.push(plan);
      }
    });

    if (flag) {
      setOlderData(older);
    }
    return updatedData;
  };

  // Sort and display plan based on dates.
  useEffect(() => {
    if (state.user.name != undefined) {
      const result = sortByDay();
      setPlanData(result);
    }
  }, [state]);

  // Run this useffect if we found data older than yesterday's date.
  useEffect(() => {
    if (olderData != null) {
      let updatedData = state.plans.filter((obj1) => {
        return !olderData.find((obj2) => obj1.id == obj2.id);
      });
      axios
        .put(API_URL, {
          ...state,
          plans: updatedData,
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              plans: res?.data?.plans,
            },
          });
        });
    }
  }, [olderData]);

  if (appLoading) return <Shimmer />;
  return (
    <>
      <PlannersHeader toggleData={toggleData} setToggleData={setToggleData} />
      {/*
      <div className="overflow-y-auto no-scrollbar"
        style={{ maxHeight: window.innerHeight - 400 }}>
        </div>
      */}
      <div>
        {toggleData == "yesterday" &&
          planData[yesterday.date()]?.length == 0 && (
            <h1 className="m-10 text-center font-bold text-xl">
              No plans found. Check back tomorrow!
            </h1>
          )}

        {toggleData == "yesterday" &&
          planData?.[yesterday.date()]?.map((plan) => {
            let startTime = dayjs()
              .hour(plan.start?.slice(0, 2))
              .minute(plan.start?.slice(3, 5));
            let endTime = dayjs()
              .hour(plan.end?.slice(0, 2))
              .minute(plan.end?.slice(3, 5));

            return (
              <div key={plan.id}>
                <PlanWrapper status={-1}>
                  <SinglePlan
                    start={startTime}
                    end={endTime}
                    name={plan.name}
                    status={-1}
                  />
                </PlanWrapper>
              </div>
            );
          })}

        {toggleData == "today" && planData?.[today.date()]?.length == 0 && (
          <h1 className="m-10 text-center font-bold text-xl">
            No plans found for today! Click on the plus button to add one!
          </h1>
        )}

        {toggleData == "today" &&
          planData?.[today.date()]?.map((plan) => {
            let startTime = dayjs()
              .hour(plan.start?.slice(0, 2))
              .minute(plan.start?.slice(3, 5));
            let endTime = dayjs()
              .hour(plan.end?.slice(0, 2))
              .minute(plan.end?.slice(3, 5));
            let status = getStatus(plan.start, plan.end);

            return (
              <div key={plan.id}>
                <PlanWrapper status={status}>
                  <SinglePlan
                    start={startTime}
                    end={endTime}
                    name={plan.name}
                    status={status}
                  />
                </PlanWrapper>
              </div>
            );
          })}

        {toggleData == "tomorrow" && planData[tomorrow.date()]?.length == 0 && (
          <h1 className="m-10 text-center font-bold text-xl">
            No plans found. Click on the plus button to add one!
          </h1>
        )}

        {toggleData == "tomorrow" &&
          planData?.[tomorrow.date()]?.map((plan) => {
            let startTime = dayjs()
              .hour(plan.start?.slice(0, 2))
              .minute(plan.start?.slice(3, 5));
            let endTime = dayjs()
              .hour(plan.end?.slice(0, 2))
              .minute(plan.end?.slice(3, 5));

            return (
              <div key={plan.id}>
                <PlanWrapper status={1}>
                  <SinglePlan
                    start={startTime}
                    end={endTime}
                    name={plan.name}
                    status={1}
                  />
                </PlanWrapper>
              </div>
            );
          })}

        {/** 
        <div>
          <input type="time" onChange={(e) => setTime(e.target.value)} />
        </div>
        */}
      </div>
    </>
  );
};

export default RenderPlanner;
