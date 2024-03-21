import { RouterProvider } from "react-router-dom";
import HABITECH_ROUTES from "./routes";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { BGCircuit } from "./constants";

function App() {
  useEffect(() => {
    let bgImage = localStorage.getItem("bgImageData");
    let bodyNode = document.querySelector("body");
    bodyNode.style.backgroundImage = `url("${BGCircuit}")`;
  }, []);
  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={HABITECH_ROUTES} />
    </AnimatePresence>
  );
}

export default App;
