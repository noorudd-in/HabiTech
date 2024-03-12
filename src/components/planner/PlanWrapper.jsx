import CircleIcon from "../icons/CircleIcon";
import CircleTickedIcon from "../icons/CircleTickedIcon";
import { useColorTheme } from "../../hooks/useColorTheme";

const PlanWrapper = ({ children, status }) => {
  const { bgcolor100 } = useColorTheme();
  return (
    <div className="px-4 mx-auto">
      <div className="flex">
        <div className="flex flex-col items-center">
          {status <= 0 ? <CircleTickedIcon /> : <CircleIcon />}
          <div
            className={`w-px h-full ${
              status <= 0 ? bgcolor100 : "bg-slate-700 dark:bg-gray-400"
            }`}
          />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default PlanWrapper;
