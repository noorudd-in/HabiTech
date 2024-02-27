import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { HabitechContext } from "../../contexts/HabitechContext";
import Shimmer from "../../pages/Shimmer";
import DropDownContent from "../electrons/DropDownContent";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const RenderGoals = () => {
  const { state, dispatch, appLoading } = useContext(HabitechContext);
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  if (appLoading) return <Shimmer />;

  const list = [
    { name: "Montly Goals", type: "monthly" },
    { name: "Quaterly Goals", type: "quaterly" },
    { name: "Yearly Goals", type: "yearly" },
  ];

  const toggleTap = (type) => {
    if (dropdown == type) {
      setDropdown(false);
      return;
    }
    setDropdown(type);
  };
  return (
    <>
      <div className="mt-10">
        <div className="text-center mb-5 border border-red-500 p-2">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="text-center border"
            onClick={() => toggleTap("monthly")}
          >
            <h1>Monthly Goals</h1>
          </motion.div>

          {dropdown == "monthly" && <DropDownContent />}
        </div>

        <div className="text-center my-2">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="text-center border"
            onClick={() => toggleTap("quaterly")}
          >
            <h1>Quaterly Goals</h1>
          </motion.div>

          {dropdown == "quaterly" && <DropDownContent />}
        </div>
      </div>
    </>
  );
};

export default RenderGoals;
