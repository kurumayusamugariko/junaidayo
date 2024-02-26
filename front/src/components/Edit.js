import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Edit.css";

import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function Edit() {
  //画像関係
  const [imageSrcs, setImageSrcs] = useState({
    member1: "okkotu.jpg",
    member2: "okkotu.jpg",
    member3: "okkotu.jpg",
    member4: "okkotu.jpg",
  });

  const handleImageUpload = (member) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrcs((prev) => ({ ...prev, [member]: reader.result }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };
  //sqlから表示「じゃがいも」
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/sql")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  //コマンド関係
  const [events, setEvents] = useState([
    { type: "wave", index: 0 },
    { type: "turn", index: 0 },
  ]);
  const [waveIndex, setWaveIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);

  const newTurn = () => {
    setTurnIndex(turnIndex + 1);
    setEvents((prevEvents) => [
      ...prevEvents,
      { type: "turn", index: turnIndex + 1 },
    ]);
  };

  const newWave = () => {
    if (events[events.length - 1].type === "turn") {
      setWaveIndex(waveIndex + 1);
      setEvents((prevEvents) => [
        ...prevEvents,
        { type: "wave", index: waveIndex + 1 },
      ]);
    }
  };

  const reset = () => {
    if (window.confirm("本当にリセットしますか？")) {
      setEvents([
        { type: "wave", index: 0 },
        { type: "turn", index: 0 },
      ]); // eventsを初期状態にリセット
      setWaveIndex(0); // waveIndexを初期状態にリセット
      setTurnIndex(0); // turnIndexを初期状態にリセット
    }
  };
  console.log(events); //コマンドの中身を確認

  return (
    <div className="Mainpage">
      <h1>編集ページ</h1>
      <form method="post">
        <div className="teamName">
          <label for="teamName">チーム名 :</label>
          <input type="text" id="teamName" defaultValue="漏瑚対策" />
        </div>

        <div className="teamMember">
          <ul>
            <li className="m1">
              <img
                alt="member1"
                src={imageSrcs.member1}
                onClick={() => handleImageUpload("member1")}
              />
              <p>乙骨</p>
            </li>
            <li className="m2">
              <img
                alt="member2"
                src={imageSrcs.member2}
                onClick={() => handleImageUpload("member2")}
              />
              <p>乙骨</p>
            </li>
            <li className="m3">
              <img
                alt="member3"
                src={imageSrcs.member3}
                onClick={() => handleImageUpload("member3")}
              />
              <p>乙骨</p>
            </li>
            <li className="m4">
              <img
                alt="member4"
                src={imageSrcs.member4}
                onClick={() => handleImageUpload("member4")}
              />
              <p>乙骨</p>
            </li>
          </ul>
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
          <br></br>
          <Button onClick={reset} className="reset" variant="contained">
            <RestartAltIcon />
            RESET
          </Button>
        </div>

        <div className="memo">
          <p className="contents">memo</p>
          <textarea defaultValue={message}></textarea>
        </div>

        <Link to="/main">
          <Button type="submit" className="toMain">
            保存
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Edit;
