import { useEffect, useState } from "react";
import "../../index.css";

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
    let rootNode = document.getElementById("root");

    let bodyNode = document.querySelector("body");
  }, []);

  return (
    <div className={`app ${bg}`}>
      <button onClick={() => setbg("brick")}>Chage to Brick</button>
      <button onClick={() => setbg("texture")}>Chage to Texture</button>
    </div>
  );
};

export default BGTheme;
