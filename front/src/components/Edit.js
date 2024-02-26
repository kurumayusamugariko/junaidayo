import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Edit.css";

import Button from "@mui/material/Button";
import ReactDOM from "react-dom";
import NewTurn from "./NewTurn";


          
function Edit() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/sql")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);



  return (
    <div className="Mainpage">
      <h1>編集ページ</h1>
      <div className="teamName">
        <h3>漏瑚対策</h3>
      </div>

      <div className="teamMember">
        <img className="m1" alt="１" src="okkotu.jpg"></img>
        <img className="m2" alt="２" src="okkotu.jpg"></img>
        <img className="m3" alt="３" src="okkotu.jpg"></img>
        <img className="m4" alt="４" src="okkotu.jpg"></img>
      </div>

      <div className="command-container">
        <div className="command">
          <div className="wave">wave1</div>
          <div className="turn-container">
            <div className="turn">
              <div className="turnNumber">1</div>
              <div className="first t">
                <select>
                  <option value="firstOption">1と技A</option>
                  <option value="secondOption">2ndOption</option>
                  <option value="3rdOption">3rdOption</option>
                  <option value="4thOption">4thOption</option>

                  <option value="5thOption">5thOption</option>
                  <option value="6thOption">6thOption</option>
                  <option value="7thOption">7thOption</option>
                  <option value="8thOption">8thOption</option>

                  <option value="9thOption">9thOption</option>
                  <option value="10thOption">10thOption</option>
                  <option value="11thOption">11thOption</option>
                  <option value="12thOption">12thOption</option>

                  <option value="13thOption">13thOption</option>
                  <option value="14thOption">14thOption</option>
                  <option value="15thOption">15thOption</option>
                  <option value="16thOption">16thOption</option>
                </select>
              </div>
              <div className="second t">1←技A</div>
              <div className="third t">1←技A</div>
              <div className="forth t">1←技A</div>
            </div>
          </div>
        </div>
        
         <Button className="newTurn" variant="contained">
          + NEW TURN
        </Button> 
        <br></br>
        <Button className="newWave" variant="contained">
          + NEW WAVE
        </Button>
      </div>

      <div className="memo">
        <p className="contents">memo</p>
        <p>{message}</p>
      </div>

      <Link to="/main">保存</Link>
    </div>
  );
}

export default Edit;
