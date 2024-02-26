import React, { useState } from "react";
import TestComponent from "./TestComponent";

const NewTurn = () => {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick()}>コンポーネントを作成する</button>
      {showComponent && <TestComponent />}
    </div>
  );
};

export default NewTurn;
