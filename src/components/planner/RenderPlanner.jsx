import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import PlannersHeader from "./PlannersHeader";
import SinglePlan from "./SinglePlan";
import dayjs from "dayjs";
import PlanWrapper from "./PlanWrapper";
import Shimmer from "../../pages/Shimmer";

const RenderPlanner = () => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);
  const [time, setTime] = useState(null);

  const getStatus = (startTime, endTime) => {
    let currentTime = dayjs();
    // Past
    if (currentTime.hour() > endTime?.hour()) {
      return -1;
    }
    if (currentTime.hour() < startTime?.hour()) {
      return 1;
    }
    if (
      currentTime.hour() >= startTime.hour() &&
      currentTime.hour() <= endTime.hour()
    ) {
      console.log(startTime.hour(), currentTime.hour(), endTime.hour());

      if (
        currentTime.hour() == startTime.hour() ||
        currentTime.hour() == endTime.hour()
      ) {
        if (currentTime.minute() < startTime?.minute()) {
          return 1;
        }
        if (currentTime.minute() > endTime?.minute()) {
          return -1;
        }

        if (
          currentTime.minute() >= startTime?.minute() &&
          currentTime.minute() <= endTime?.minute()
        ) {
          return 0;
        }
      } else {
        return 0;
      }
    }
  };

  useEffect(() => {
    const time1 = dayjs().hour(11).minute(1);
    const time2 = dayjs().hour(11).minute(20);
    const time = "14:24";
    //console.log(dayjs().hour(time.slice(0, 2)).minute(time.slice(3, 5)));
    //console.log(time2.diff(time1, "minutes"));
    //console.log(time);
  }, [time]);

  if (appLoading) return <Shimmer />;
  return (
    <>
      <PlannersHeader />
      {/*
      <div className="overflow-y-auto no-scrollbar"
        style={{ maxHeight: window.innerHeight - 400 }}>
        </div>
      */}
      <div>
        {state?.plans?.length == 0 && (
          <h1 className="m-10 text-center font-bold text-xl">
            No plans found for today! Click on the plus button to add one!
          </h1>
        )}
        {state?.plans?.map((plan) => {
          let startTime = dayjs()
            .hour(plan.start?.slice(0, 2))
            .minute(plan.start?.slice(3, 5));

          let endTime = dayjs()
            .hour(plan.end?.slice(0, 2))
            .minute(plan.end?.slice(3, 5));

          let status = getStatus(startTime, endTime);

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
