import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";

import DragIcon from "../../icons/DragIcon";

const DragAndSort = () => {
  const [defaultView, setDefaultView] = useState(["planner", "habit", "goal"]);

  useEffect(() => {
    if (localStorage.getItem("defaultTabs") != null) {
      setDefaultView(JSON.parse(localStorage.getItem("defaultTabs")));
    }
  }, []);

  const handleOrder = (newOrder) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate([5, 200, 20]);
    }
    setDefaultView(newOrder);
    localStorage.setItem("defaultTabs", JSON.stringify(newOrder));
  };

  return (
    <div>
      <Reorder.Group values={defaultView} onReorder={handleOrder}>
        {defaultView?.map((item, ind) => {
          return (
            <Reorder.Item key={item} value={item}>
              <div className="border p-1 m-2 text-lg flex justify-between rounded-lg cursor-pointer">
                <h1 className="pl-2">
                  {ind + 1} - {item[0].toUpperCase() + item.slice(1)}
                </h1>
                <DragIcon className="w-7 h-7" />
              </div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};

export default DragAndSort;
