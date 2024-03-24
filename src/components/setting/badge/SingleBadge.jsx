import { useColorTheme } from "../../../hooks/useColorTheme";
import SingleBadgeIcon from "../../icons/SingleBadgeIcon";
const SingleBadge = () => {
  const { textcolor500 } = useColorTheme();
  return (
    <div className="border mx-5 mt-10">
      <h1 className={`text-center my-5 text-2xl font-semibold ${textcolor500}`}>
        Celebrate your achievements 👏
      </h1>
      <div class="grid grid-cols-2 sm:grid-cols-4">
        <div class="col text-center my-2">
          <div className="mx-5">
            <SingleBadgeIcon />
          </div>
          <h1 className="text-lg font-medium">Over Acheiever</h1>
        </div>
      </div>
    </div>
  );
};

export default SingleBadge;
