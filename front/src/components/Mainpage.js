import React, { useState, useEffect } from "react";
import "../css/Main.css";

//マテリアルUI
import Button from '@mui/material/Button';

function Mainpage() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/sql")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div className="Mainpage">
      
      <div className="teamName">漏瑚対策</div>
      <div className="command">
			<Button className="newTurn" variant="contained">+ NEW TURN</Button>
			<br></br>
			<Button className="newWave" variant="contained">+ NEW WAVE</Button>
			</div>
			<div className="memo">
				<p>memo</p>
				<p>{message}</p>
			</div>
			
    </div>
  );
}

export default Mainpage;
