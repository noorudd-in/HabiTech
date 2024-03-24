import { Suspense, lazy } from "react";
import Shimmer from "../../pages/Shimmer";
import dayjs from "dayjs";
const AreaGraph = lazy(() => import("../chart/AreaGraph"));

const HabitModalContent = ({ data }) => {
  return (
    <div>
      <div className="p-5 md:p-q space-y-1">
        <div>
          You have completed this habit {data.posCount} time(s) and skipped{" "}
          {data.negCount} time(s) which gives you {data.posCount * 5} coins and{" "}
          {data.posCount * data.expValue} experience points so far.
        </div>

        <div>
          {data.analytics[5] == undefined ? (
            <h1 className="text-center m-3">
              Data too low to show analytical chart. Regulary update the habit
              to view chart.
            </h1>
          ) : (
            <Suspense fallback={<Shimmer />}>
              <AreaGraph data={data.analytics} />
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
    </div>
  );
};

export default HabitModalContent;
