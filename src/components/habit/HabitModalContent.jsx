import { Suspense, lazy } from "react";
import Shimmer from "../../pages/Shimmer";
import dayjs from "dayjs";
import { useColorTheme } from "../../hooks/useColorTheme";
import { useNavigate } from "react-router-dom";
const AreaGraph = lazy(() => import("../chart/AreaGraph"));

const HabitModalContent = ({ data }) => {
  const { textcolor500 } = useColorTheme();
  const navigate = useNavigate();
  let newCoins;
  if (data.difficulty == "easy") newCoins = 0.5;
  if (data.difficulty == "decent") newCoins = 1;
  if (data.difficulty == "hard") newCoins = 1.5;

  const duplicateNavigation = () => {
    navigate(`/create/habit?name=${data.name}&difficulty=${data.difficulty}`);
  };
  return (
    <div className="p-5 md:p-q space-y-1">
      <p
        className={`text-center ${textcolor500} mb-3 underline underline-offset-4`}
        onClick={duplicateNavigation}
      >
        Copy this habit
      </p>
      <div>
        You have completed this habit {data.posCount} time(s) and skipped{" "}
        {data.negCount} time(s) which gives you {data.posCount * newCoins} coins
        and {data.posCount * data.expValue} experience points so far.
      </div>

      <div>
        {data.analytics[5] == undefined ? (
          <h1 className="text-center m-3">
            Data too low to show analytical chart. Regulary update the habit to
            view chart.
          </h1>
        ) : (
          <Suspense fallback={<Shimmer />}>
            <AreaGraph
              data={data.analytics}
              xkey={"count"}
              modal={true}
              height={150}
            />
          </Suspense>
        )}
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

export default HabitModalContent;
