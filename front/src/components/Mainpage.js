import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Main.css";

//マテリアルUI
import Button from "@mui/material/Button";

function Mainpage() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/sql")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
  return (
    <div className="Mainpage">
      <div className="teamName">
        <h3>漏瑚対策</h3>
        <Link to="/edit">
        <Button className="toEdit" variant="contained">編集</Button>
        </Link>
      </div>

      <div className="teamMembers">
        <img className="m1" alt="１" src="okkotu.jpg"></img>
        <img className="m2" alt="２" src="okkotu.jpg"></img>
        <img className="m3" alt="３" src="okkotu.jpg"></img>
        <img className="m4" alt="４" src="okkotu.jpg"></img>
      </div>

      <div className="Names">
        <p className="name">乙骨 幻</p>
        <p className="name">乙骨 幻</p>
        <p className="name">乙骨 幻</p>
        <p className="name">乙骨 幻</p>
      </div>

      <div className="command-container">
        <div className="command">
          <div className="wave">wave1</div>
          <div className="turn-container">
            <div className="turn">
              <div className="turnNumber">1</div>
              <div className="first t">1←技A</div>
              <div className="second t">1←技A</div>
              <div className="third t">1←技A</div>
              <div className="forth t">1←技A</div>
            </div>
          </div>
        </div>

      </div>

      <div className="memo">
        <p className="contents">memo</p>
        <p>{message}</p>
      </div>

      <Link to="/" className="link"><Button className="toMain">戻る</Button></Link>
    </div>
  );
}

export default Mainpage;
