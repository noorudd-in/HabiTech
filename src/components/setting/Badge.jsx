import { useBadgeData } from "../../hooks/useBadgeData";
import { useColorTheme } from "../../hooks/useColorTheme";
import SingleBadge from "./badge/SingleBadge";

const Badge = () => {
  const { textcolor500 } = useColorTheme();
  const data = useBadgeData();
  return (
    <div className="mb-24">
      <div className="mt-5">
        <h1 className={`text-center text-2xl font-semibold ${textcolor500}`}>
          Celebrate your achievements 👏
        </h1>
        <h1 className="text-center">Badges Earned: {data.length}/48</h1>
      </div>

      <div className="mx-5 mt-5">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {data?.map((badge) => {
            return (
              <SingleBadge
                key={badge.name}
                name={badge.name}
                description={badge.description}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Badge;
