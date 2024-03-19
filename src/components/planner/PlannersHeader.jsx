import dayjs from "dayjs";
import { useColorTheme } from "../../hooks/useColorTheme";
import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";

const PlannersHeader = ({ toggleData, setToggleData }) => {
  const { bgcolor500 } = useColorTheme();
  const { state } = useContext(HabitechContext);

  const toggleChange = (value) => {
    if (state.user.vibrate) {
      window.navigator.vibrate(5);
    }
    setToggleData(value);
  };
  return (
    <>
      <div className="flex justify-center">
        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${
            toggleData == "yesterday"
              ? `${bgcolor500} text-black`
              : "border-gray-300"
          }`}
          onClick={() => toggleChange("yesterday")}
        >
          <div>{dayjs().subtract(1, "day").format("ddd")}</div>
          <div>{dayjs().subtract(1, "day").format("DD MMM")}</div>
        </div>

        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${
            toggleData == "today"
              ? `${bgcolor500} text-black`
              : " border-gray-300"
          }`}
          onClick={() => toggleChange("today")}
        >
          <div>{dayjs().format("ddd")}</div>
          <div>{dayjs().format("DD MMM")}</div>
        </div>

        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${
            toggleData == "tomorrow"
              ? `${bgcolor500} text-black`
              : "border-gray-300"
          }`}
          onClick={() => toggleChange("tomorrow")}
        >
          <div>{dayjs().add(1, "day").format("ddd")}</div>
          <div>{dayjs().add(1, "day").format("DD MMM")}</div>
        </div>
      </div>
    </>
  );
};

export default PlannersHeader;
