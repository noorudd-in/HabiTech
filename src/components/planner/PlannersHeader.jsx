import dayjs from "dayjs";
import { useColorTheme } from "../../hooks/useColorTheme";

const PlannersHeader = () => {
  const { bgcolor500 } = useColorTheme();
  return (
    <>
      <div className="flex justify-center">
        <div className="border m-2 p-2 text-center text-sm rounded-full">
          <div>{dayjs().subtract(1, "day").format("ddd")}</div>
          <div>{dayjs().subtract(1, "day").format("DD MMM")}</div>
        </div>

        <div
          className={`border m-2 p-2 text-center text-sm rounded-full ${bgcolor500} text-black border-black`}
        >
          <div>{dayjs().format("ddd")}</div>
          <div>{dayjs().format("DD MMM")}</div>
        </div>

        <div className="border m-2 p-2 text-center text-sm rounded-full">
          <div>{dayjs().add(1, "day").format("ddd")}</div>
          <div>{dayjs().add(1, "day").format("DD MMM")}</div>
        </div>
      </div>
    </>
  );
};

export default PlannersHeader;
