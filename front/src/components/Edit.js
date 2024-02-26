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

  const [events, setEvents] = useState([{ type: 'wave', index: 0 }, { type: 'turn', index: 0 }]);
  const [waveIndex, setWaveIndex] = useState(0); // waveIndexを状態として保持
  const [turnIndex, setTurnIndex] = useState(0); // turnIndexを状態として保持

  const newTurn = () => {
    setTurnIndex(turnIndex + 1); // turnIndexをインクリメント
    setEvents((prevEvents) => [
      ...prevEvents,
      { type: "turn", index: turnIndex + 1 },
    ]);
		console.log(events);
  };

  const newWave = () => {
		if(events[events.length - 1].type === "turn"){
    setWaveIndex(waveIndex + 1); // waveIndexをインクリメント
    setEvents((prevEvents) => [
      ...prevEvents,
      { type: "wave", index: waveIndex + 1 },
    ]);
	}
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
          <div className="turn-container">
            <ul>
              {events.map((item, index) => (
                <li key={index}>
                  {item.type === "wave" ? (
                    <li className="wave" key={item.index}>
                      wave{item.index + 1}
                    </li>
                  ) : (
                    <div className="turn">
                      <div className="turnNumber">{item.index + 1}</div>
                      <select className="turn">
                        <option value="firstOption">1←技A</option>
                        <option value="secondOption">1←技B</option>
                        <option value="3rdOption">1←技C</option>
                        <option value="4thOption">1←必</option>

                        <option value="5thOption">2←技A</option>
                        <option value="6thOption">2←技B</option>
                        <option value="7thOption">2←技C</option>
                        <option value="8thOption">2←必</option>

                        <option value="9thOption">3←技A</option>
                        <option value="10thOption">3←技B</option>
                        <option value="11thOption">3←技C</option>
                        <option value="12thOption">3←必</option>

                        <option value="13thOption">4←技A</option>
                        <option value="14thOption">4←技B</option>
                        <option value="15thOption">4←技C</option>
                        <option value="16thOption">4←必</option>
                      </select>
                      <select className="turn">
                        <option value="firstOption">1←技A</option>
                        <option value="secondOption">1←技B</option>
                        <option value="3rdOption">1←技C</option>
                        <option value="4thOption">1←必</option>

                        <option value="5thOption">2←技A</option>
                        <option value="6thOption">2←技B</option>
                        <option value="7thOption">2←技C</option>
                        <option value="8thOption">2←必</option>

                        <option value="9thOption">3←技A</option>
                        <option value="10thOption">3←技B</option>
                        <option value="11thOption">3←技C</option>
                        <option value="12thOption">3←必</option>

                        <option value="13thOption">4←技A</option>
                        <option value="14thOption">4←技B</option>
                        <option value="15thOption">4←技C</option>
                        <option value="16thOption">4←必</option>
                      </select>
                      <select className="turn">
                        <option value="firstOption">1←技A</option>
                        <option value="secondOption">1←技B</option>
                        <option value="3rdOption">1←技C</option>
                        <option value="4thOption">1←必</option>

                        <option value="5thOption">2←技A</option>
                        <option value="6thOption">2←技B</option>
                        <option value="7thOption">2←技C</option>
                        <option value="8thOption">2←必</option>

                        <option value="9thOption">3←技A</option>
                        <option value="10thOption">3←技B</option>
                        <option value="11thOption">3←技C</option>
                        <option value="12thOption">3←必</option>

                        <option value="13thOption">4←技A</option>
                        <option value="14thOption">4←技B</option>
                        <option value="15thOption">4←技C</option>
                        <option value="16thOption">4←必</option>
                      </select>
                      <select className="turn">
                        <option value="firstOption">1←技A</option>
                        <option value="secondOption">1←技B</option>
                        <option value="3rdOption">1←技C</option>
                        <option value="4thOption">1←必</option>

                        <option value="5thOption">2←技A</option>
                        <option value="6thOption">2←技B</option>
                        <option value="7thOption">2←技C</option>
                        <option value="8thOption">2←必</option>

                        <option value="9thOption">3←技A</option>
                        <option value="10thOption">3←技B</option>
                        <option value="11thOption">3←技C</option>
                        <option value="12thOption">3←必</option>

                        <option value="13thOption">4←技A</option>
                        <option value="14thOption">4←技B</option>
                        <option value="15thOption">4←技C</option>
                        <option value="16thOption">4←必</option>
                      </select>
                    </div>
                  )}
                </li>
              ))}
            </ul>
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

        <p>{message}</p>
      </div>

      <Link to="/main">保存</Link>
    </div>
  );
}

export default Edit;
