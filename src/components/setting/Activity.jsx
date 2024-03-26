import { useColorTheme } from "../../hooks/useColorTheme";
import { useContext, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { API_URL } from "../../constants";
import dayjs from "dayjs";
import CreateActivityIcon from "../icons/CreateActivityIcon";
import EditActivityIcon from "../icons/EditActivityIcon";
import DeleteActivityIcon from "../icons/DeleteActivityIcon";
import PurchaseActivityIcon from "../icons/PurchaseActivityIcon";
import CompletedActivityIcon from "../icons/CompletedActivityIcon";
import axios from "axios";

const Activity = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const { bgcolor400, textcolor500 } = useColorTheme();

  // Limit the activities to 50 only.
  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
    let len = state.activity.length;
    if (len > 50) {
      let updatedActivity = state.activity.slice(len - 50, len);

      axios
        .put(API_URL, {
          ...state,
          activity: updatedActivity,
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              activity: res?.data?.activity,
            },
          });
        });
    }
  }, []);
  return (
    <div className="mb-24">
      <div className="text-center mt-10 mb-5">
        <h1 className={`text-3xl ${textcolor500} font-bold`}>
          Your Activity Feed ⏳
        </h1>
        <p className="text-sm">Showing last 50 activities.</p>
      </div>

      <div className="ml-5">
        {state.activity[0] == undefined && (
          <h1 className="text-center">No activity to show!</h1>
        )}
        {state.activity.toReversed().map((ele) => {
          return (
            <div className="flex" key={ele.time}>
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${bgcolor400}`}>
                  {ele.action == "create" && (
                    <CreateActivityIcon className="w-6 h-6 text-white" />
                  )}
                  {ele.action == "edit" && (
                    <EditActivityIcon className="w-6 h-6 text-white" />
                  )}
                  {ele.action == "delete" && (
                    <DeleteActivityIcon className="w-6 h-6 text-white" />
                  )}
                  {ele.action == "purchase" && (
                    <PurchaseActivityIcon className="w-6 h-6 text-white" />
                  )}
                  {ele.action == "complete" && (
                    <CompletedActivityIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className={`w-px h-full bg-gray-400`} />
              </div>
              <div className="w-full h-12 ml-3 mt-1 mb-5">
                {ele.action == "create" && (
                  <h1 className="text-lg">
                    Created New {ele.type[0].toUpperCase() + ele.type.slice(1)}:{" "}
                    {ele.name}
                  </h1>
                )}
                {ele.action == "edit" && (
                  <h1 className="text-lg">
                    Modified {ele.type[0].toUpperCase() + ele.type.slice(1)}:{" "}
                    {ele.name}
                  </h1>
                )}
                {ele.action == "delete" && (
                  <h1 className="text-lg">
                    Deleted {ele.type[0].toUpperCase() + ele.type.slice(1)}:{" "}
                    {ele.name}
                  </h1>
                )}
                {ele.action == "complete" && (
                  <h1 className="text-lg">
                    Completed {ele.type[0].toUpperCase() + ele.type.slice(1)}:{" "}
                    {ele.name}
                  </h1>
                )}
                {ele.action == "purchase" && (
                  <h1 className="text-lg">
                    Purchased New{" "}
                    {ele.type[0].toUpperCase() + ele.type.slice(1)}
                  </h1>
                )}
                <h1 className="text-sm italic">
                  {dayjs(new Date(ele.time)).format("D MMM YYYY, h:mm A")}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;
