import dayjs from "dayjs";
import { useColorTheme } from "../../hooks/useColorTheme";
import { useNavigate } from "react-router-dom";

const PlanModalContent = ({ data }) => {
  const { textcolor500 } = useColorTheme();
  const navigate = useNavigate();

  const duplicateNavigation = () => {
    let startTimeHour = data.start.hour();
    let startTimeMinute = data.start.minute();
    let endTimeHour = data.end.hour();
    let endTimeMinute = data.end.minute();
    if (String(startTimeHour).length == 1) startTimeHour = "0" + startTimeHour;
    if (String(startTimeMinute).length == 1)
      startTimeMinute = "0" + startTimeMinute;
    if (String(endTimeHour).length == 1) endTimeHour = "0" + endTimeHour;
    if (String(endTimeMinute).length == 1) endTimeMinute = "0" + endTimeMinute;

    let startTime = startTimeHour + ":" + startTimeMinute;
    let endTime = endTimeHour + ":" + endTimeMinute;

    navigate(
      `/create/plan?name=Copy of ${data.name}&start=${startTime}&end=${endTime}&repeat=${data.repeat}&description=${data.description}`
    );
  };
  return (
    <div>
      <div className="p-3 md:p-q space-y-1">
        <p
          className={`text-center ${textcolor500} mb-3 underline underline-offset-4`}
          onClick={duplicateNavigation}
        >
          Copy this plan
        </p>
        <div>
          Time: {data.start.format("h:mm A")} to {data.end.format("h:mm A")}
        </div>
        <div>
          {data.description != "" ? (
            <h1>Description: {data.description}</h1>
          ) : (
            <h1>No description found!</h1>
          )}
        </div>
      </div>

      <div className="text-sm font-thin px-5 md:p-q space-y-1 mb-3">
        <p>
          Created at:
          <span> {dayjs(new Date(data.id)).format("DD/MM/YYYY h:mm A")}</span>
        </p>
        <p>
          Last modified at:
          <span>
            {" "}
            {dayjs(new Date(data.lastUpdated)).format("DD/MM/YYYY h:mm A")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PlanModalContent;
