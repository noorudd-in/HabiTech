import React, { useEffect, useState } from "react";

const Test = () => {
  const [defaultView, setDefaultView] = useState("");

  useEffect(() => {
    const userHeaderView = localStorage.getItem("userHeaderView");
    if (userHeaderView == null || userHeaderView == undefined) {
      //
    }
  });
  return (
    <div>
      <li draggable>One</li>
      <li draggable>Two</li>
      <li draggable>Three</li>
    </div>
  );
};

export default Test;
