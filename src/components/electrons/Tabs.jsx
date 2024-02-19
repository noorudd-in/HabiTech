const Tabs = ({ currentTab, setCurrentTab }) => {
  return (
    <div
      className={`mx-[20%] mt-3 grid grid-flow-col text-center text-gray-500 bg-amber-100 rounded-full p-1`}
    >
      <div
        onClick={() => {
          setCurrentTab("habits");
        }}
      >
        <p
          className={`flex justify-center py-1 ${
            currentTab == "habits" &&
            `bg-amber-400 rounded-full shadow text-slate-800`
          }`}
        >
          Habits
        </p>
      </div>
      <div
        onClick={() => {
          setCurrentTab("goals");
        }}
      >
        <p
          className={`flex justify-center py-1 ${
            currentTab == "goals" &&
            `bg-amber-400 rounded-full shadow text-slate-800`
          }`}
        >
          Goals
        </p>
      </div>
    </div>
  );
};

export default Tabs;
