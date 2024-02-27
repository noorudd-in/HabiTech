import { motion } from "framer-motion";
import { useState } from "react";

let tabs = [
  { id: "habits", label: "Habit" },
  { id: "goals", label: "Goals" },
];

const AnimatedTabs = ({ setCurrentTab }) => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  function setTab(id) {
    setActiveTab(id);
    setCurrentTab(id);
  }

  return (
    <div
      className={`mx-[20%] mt-3 grid grid-flow-col text-center text-gray-500 bg-amber-100 rounded-full p-1`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          className={`${
            activeTab === tab.id ? "" : "hover:text-gray-500 "
          } relative rounded-full px-3 py-1.5 text-sm font-medium text-gray-500 outline-sky-400 transition focus-visible:outline-2`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-amber-400 text-black"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-20 ${activeTab === tab.id && "text-black"}`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default AnimatedTabs;
