import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useColorTheme } from "../../hooks/useColorTheme";

const AnimatedTabs = ({ setCurrentTab }) => {
  const { bgcolor100, bgcolor400 } = useColorTheme();
  const [tabs, setTabs] = useState([
    { id: "planner", label: "Planner" },
    { id: "habit", label: "Habit" },
    { id: "goal", label: "Goal" },
  ]);
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  useEffect(() => {
    let defaultTabs = JSON.parse(localStorage.getItem("defaultTabs"));
    if (defaultTabs != null) {
      setTabs([
        {
          id: defaultTabs[0],
          label: defaultTabs[0][0].toUpperCase() + defaultTabs[0].slice(1),
        },
        {
          id: defaultTabs[1],
          label: defaultTabs[1][0].toUpperCase() + defaultTabs[1].slice(1),
        },
        {
          id: defaultTabs[2],
          label: defaultTabs[2][0].toUpperCase() + defaultTabs[2].slice(1),
        },
      ]);
      setActiveTab(defaultTabs[0]);
      setCurrentTab(defaultTabs[0]);
    }
  }, []);

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
