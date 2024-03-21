import { useEffect, useState } from "react";
import { BGTopography, BGGraph, BGCircuit, BGPuzzle } from "../../constants";

const BGTheme = () => {
  const [bg, setBg] = useState("");

  const setbg = (value) => {
    if (value == "brick") {
      setBg("red");
    }

    if (value == "texture") {
      setBg("yellow");
    }
  };

  useEffect(() => {
    localStorage.setItem("bgImageData", JSON.stringify(BGPuzzle));
  }, []);

  return (
    <div className={`app ${bg}`}>
      <button onClick={() => setbg("brick")}>Chage to Brick</button>
      <button onClick={() => setbg("texture")}>Chage to Texture</button>
    </div>
  );
};

export default BGTheme;
