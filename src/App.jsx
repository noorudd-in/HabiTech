import { RouterProvider } from "react-router-dom";
import HABITECH_ROUTES from "./routes";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const userBG = localStorage.getItem("userBackground");
    let bodyNode = document.querySelector("body");
    bodyNode.style.backgroundImage = `url("${userBG}")`;
  }, []);
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={HABITECH_ROUTES} />
    </AnimatePresence>
  );
}

export default App;
