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

  const [turns, setTurns] = useState([]);

  const newTurn = () => {
    setTurns((prevTurns) => [...prevTurns, []]);
  };

  const newWave = () => {
    setTurns((prevTurns) => {
      const lastTurnIndex = prevTurns.length - 1;
      const newWave = {}; // 新しいウェーブのデータ
      const newTurn = [...prevTurns[lastTurnIndex], newWave];
      return [...prevTurns.slice(0, lastTurnIndex), newTurn];
    });
  };

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
              <ul>
                {turns.map((turn, index) => (
                  <li key={index}>
                    <div className="turnNumber">1</div>
                    <select className="turn">
                      <option value="firstOption">1に技A</option>
                      <option value="secondOption">2ndOption</option>
                      <option value="3rdOption">3rdOption</option>
                      <option value="4thOption">4thOption</option>

                      <option value="5thOption">2に技A</option>
                      <option value="6thOption">6thOption</option>
                      <option value="7thOption">7thOption</option>
                      <option value="8thOption">8thOption</option>

                      <option value="9thOption">3に技A</option>
                      <option value="10thOption">10thOption</option>
                      <option value="11thOption">11thOption</option>
                      <option value="12thOption">12thOption</option>

                      <option value="13thOption">4に技A</option>
                      <option value="14thOption">14thOption</option>
                      <option value="15thOption">15thOption</option>
                      <option value="16thOption">16thOption</option>
                    </select>
                    <select className="turn">
                      <option value="firstOption">1に技A</option>
                      <option value="secondOption">2ndOption</option>
                      <option value="3rdOption">3rdOption</option>
                      <option value="4thOption">4thOption</option>

                      <option value="5thOption">2に技A</option>
                      <option value="6thOption">6thOption</option>
                      <option value="7thOption">7thOption</option>
                      <option value="8thOption">8thOption</option>

                      <option value="9thOption">3に技A</option>
                      <option value="10thOption">10thOption</option>
                      <option value="11thOption">11thOption</option>
                      <option value="12thOption">12thOption</option>

                      <option value="13thOption">4に技A</option>
                      <option value="14thOption">14thOption</option>
                      <option value="15thOption">15thOption</option>
                      <option value="16thOption">16thOption</option>
                    </select>
                    <select className="turn">
                      <option value="firstOption">1に技A</option>
                      <option value="secondOption">2ndOption</option>
                      <option value="3rdOption">3rdOption</option>
                      <option value="4thOption">4thOption</option>

                      <option value="5thOption">2に技A</option>
                      <option value="6thOption">6thOption</option>
                      <option value="7thOption">7thOption</option>
                      <option value="8thOption">8thOption</option>

                      <option value="9thOption">3に技A</option>
                      <option value="10thOption">10thOption</option>
                      <option value="11thOption">11thOption</option>
                      <option value="12thOption">12thOption</option>

                      <option value="13thOption">4に技A</option>
                      <option value="14thOption">14thOption</option>
                      <option value="15thOption">15thOption</option>
                      <option value="16thOption">16thOption</option>
                    </select>
                    <select className="turn">
                      <option value="firstOption">1に技A</option>
                      <option value="secondOption">2ndOption</option>
                      <option value="3rdOption">3rdOption</option>
                      <option value="4thOption">4thOption</option>

                      <option value="5thOption">2に技A</option>
                      <option value="6thOption">6thOption</option>
                      <option value="7thOption">7thOption</option>
                      <option value="8thOption">8thOption</option>

                      <option value="9thOption">3に技A</option>
                      <option value="10thOption">10thOption</option>
                      <option value="11thOption">11thOption</option>
                      <option value="12thOption">12thOption</option>

                      <option value="13thOption">4に技A</option>
                      <option value="14thOption">14thOption</option>
                      <option value="15thOption">15thOption</option>
                      <option value="16thOption">16thOption</option>
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Button onClick={newTurn} className="newTurn" variant="contained">
          + NEW TURN
        </Button>
        <br></br>
        <Button onClick={newWave} className="newWave" variant="contained">
          + NEW WAVE
        </Button>
      </div>

      <div className="memo">
        <p className="contents">memo</p>
        {/* <p>{message}</p> */}
      </div>

      <div className="toMain">
        <Link to="/main">
          <Button variant="contained">保存</Button>
        </Link>
      </div>
    </div>
  );
}

export default Edit;
