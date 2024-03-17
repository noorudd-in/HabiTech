import { useColorTheme } from "../../hooks/useColorTheme";
import { useContext, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import dayjs from "dayjs";
import CreateActivityIcon from "../icons/CreateActivityIcon";
import EditActivityIcon from "../icons/EditActivityIcon";
import DeleteActivityIcon from "../icons/DeleteActivityIcon";
import PurchaseActivityIcon from "../icons/PurchaseActivityIcon";

const Activity = () => {
  const { state } = useContext(HabitechContext);
  const { bgcolor400, textcolor500 } = useColorTheme();

  // Limit the activities to 50 only.
  useEffect(() => {
    console.log(state.activity.length);
  }, []);
  return (
    <div className="mb-20">
      <div className="text-center mt-10 mb-5">
        <h1 className={`text-4xl ${textcolor500}`}>Your Activity Feed</h1>
        <p className={`${textcolor500} text-sm`}>Showing last 50 activities.</p>
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
                </div>
                <div className={`w-px h-full bg-slate-700 dark:bg-gray-400`} />
              </div>
              <div className="w-full h-12 ml-3 mt-1 mb-5">
                {ele.action == "create" && (
                  <h1 className="text-lg">
                    Created new {ele.type}: {ele.name}
                  </h1>
                )}
                {ele.action == "edit" && (
                  <h1 className="text-lg">
                    Modified {ele.type}: {ele.name}
                  </h1>
                )}
                {ele.action == "delete" && (
                  <h1 className="text-lg">
                    Deleted {ele.type}: {ele.name}
                  </h1>
                )}
                {ele.action == "purchase" && (
                  <h1 className="text-lg">Purchased new {ele.type}</h1>
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
