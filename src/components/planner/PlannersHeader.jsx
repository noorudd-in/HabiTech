import dayjs from "dayjs";
import { useColorTheme } from "../../hooks/useColorTheme";

const PlannersHeader = ({ toggleData, setToggleData }) => {
  const { bgcolor500 } = useColorTheme();
  return (
    <>
      <div className="flex justify-center">
        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${
            toggleData == "yesterday"
              ? `${bgcolor500} text-black`
              : "border-black dark:border-gray-300"
          }`}
          onClick={() => setToggleData("yesterday")}
        >
          <div>{dayjs().subtract(1, "day").format("ddd")}</div>
          <div>{dayjs().subtract(1, "day").format("DD MMM")}</div>
        </div>

        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${
            toggleData == "today"
              ? `${bgcolor500} text-black`
              : "border-black dark:border-gray-300"
          }`}
          onClick={() => setToggleData("today")}
        >
          <div>{dayjs().format("ddd")}</div>
          <div>{dayjs().format("DD MMM")}</div>
        </div>

        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${
            toggleData == "tomorrow"
              ? `${bgcolor500} text-black`
              : "border-black dark:border-gray-300"
          }`}
          onClick={() => setToggleData("tomorrow")}
        >
          <div>{dayjs().add(1, "day").format("ddd")}</div>
          <div>{dayjs().add(1, "day").format("DD MMM")}</div>
        </div>
      </div>
    </>
  );
};

export default PlannersHeader;
