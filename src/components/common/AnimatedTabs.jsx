import { motion } from "framer-motion";
import { useState } from "react";
import { useColorTheme } from "../../hooks/useColorTheme";

let tabs = [
  { id: "planner", label: "Planner" },
  { id: "habits", label: "Habit" },
  { id: "goals", label: "Goals" },
];

const AnimatedTabs = ({ setCurrentTab }) => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  const { bgcolor100, bgcolor400 } = useColorTheme();

  const setTab = (id) => {
    setActiveTab(id);
    setCurrentTab(id);
  };

  // Set Haptic Feedback
  const setVibrate = () => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
  };

  return (
    <div
      className={`w-3/4 mt-3 grid grid-flow-col text-center ${bgcolor100} rounded-full p-1`}
      onClick={setVibrate}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          className={`relative rounded-full px-3 py-1.5 text-sm font-medium text-gray-500 transition focus-visible:outline-2`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="bubble"
              className={`absolute inset-0 z-10 ${bgcolor400} text-black`}
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-20 ${activeTab === tab.id && `text-black`}`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AnimatedTabs;
