import { RouterProvider } from "react-router-dom";
import HABITECH_ROUTES from "./routes";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect } from "react";
import { HabitechContext } from "./contexts/HabitechContext";

function App() {
  const { state } = useContext(HabitechContext);
  useEffect(() => {
    let bodyNode = document.querySelector("body");
    //console.log(state.user.name);
    let bgImage = localStorage.getItem("bgImageData");
    bodyNode.style.backgroundImage = `url(${bgImage})`;
  }, [state]);
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={HABITECH_ROUTES} />
    </AnimatePresence>
  );
}

export default App;
