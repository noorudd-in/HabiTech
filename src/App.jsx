import { RouterProvider } from "react-router-dom";
import HABITECH_ROUTES from "./routes";

function App() {
  return (
    <>
      <RouterProvider router={HABITECH_ROUTES} />
    </>
  );
}

export default App;
