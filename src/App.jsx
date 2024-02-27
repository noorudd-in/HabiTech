import { RouterProvider } from "react-router-dom";
import HABITECH_ROUTES from "./routes";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <AnimatePresence mode="wait">
        <RouterProvider router={HABITECH_ROUTES} />
      </AnimatePresence>
    </>
  );
}

export default App;
