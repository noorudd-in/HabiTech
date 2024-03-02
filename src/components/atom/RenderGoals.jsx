import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useColorTheme } from "../../hooks/useColorTheme";
import Shimmer from "../../pages/Shimmer";
import DropDownContent from "../electrons/DropDownContent";
import DownIcon from "../icons/DownIcon";
import UpIcon from "../icons/UpIcon";
import SingleGoals from "../electrons/SingleGoals";

const RenderGoals = () => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);
  const [dropdown, setDropdown] = useState("weekly");
  const { bgcolor400 } = useColorTheme();

  const toggleTap = (type) => {
    if (dropdown == type) {
      setDropdown(false);
      return;
    }
    setDropdown(type);
  };

  if (appLoading) return <Shimmer />;

  return (
    <>
      <div className="mt-10">
        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("weekly")}
          >
            <h1 className=" text-black mr-5">Weekly Goals</h1>
            {dropdown == "weekly" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "weekly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Very short-term goals i.e. Daily or Weekly!
              </p>
              <DropDownContent />
            </>
          )}
        </div>

        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("monthly")}
          >
            <h1 className=" text-black mr-3">Monthly Goals</h1>
            {dropdown == "monthly" ? <DownIcon /> : <UpIcon />}
          </motion.div>

          {dropdown == "monthly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Short-term goals with a duration of a month or two!
              </p>
              <DropDownContent />
            </>
          )}
        </div>

        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("quaterly")}
          >
            <h1 className=" text-black mr-3">Quaterly Goals</h1>
            {dropdown == "quaterly" ? <DownIcon /> : <UpIcon />}
          </motion.div>
          {dropdown == "quaterly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Mid-term goals with 3 to 6 months of period.
              </p>
              <DropDownContent />
            </>
          )}
        </div>

        <div className="w-4/5 my-3 mx-auto">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
            onClick={() => toggleTap("yearly")}
          >
            <h1 className=" text-black mr-8">Yearly Goals</h1>
            {dropdown == "yearly" ? <DownIcon /> : <UpIcon />}
          </motion.div>
          {dropdown == "yearly" && (
            <>
              <p className="text-xs mb-5 mt-1 italic dark:text-gray-300 text-center">
                Long-term goals with annual period.
              </p>
              <DropDownContent />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RenderGoals;
