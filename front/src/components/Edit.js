import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Edit.css";
import axios from "axios";

import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
//import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Edit() {
  const [inputValue, setInputValue] = useState({
    teamName: "漏瑚対策",
    1: "1人目",
    2: "2人目",
    3: "3人目",
    4: "4人目",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/sql")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  const [textareaValue, setTextareaValue] = useState(message);

  useEffect(() => {
    setTextareaValue(message);
  }, [message]);

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

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

  //初期状態
  const [events, setEvents] = useState([
    { type: "wave", index: 0 },
    {
      type: "turn",
      index: 0,
      turn1: "1←技A",
      turn2: "1←技A",
      turn3: "1←技A",
      turn4: "1←技A",
    },
  ]);

  const [waveIndex, setWaveIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);

  const newTurn = () => {
    // 現在のWave数
    const waveCount = events.filter((item) => item.type === "wave").length;
    
    // 新しいTurnが始まるかどうか
    const isNewTurn = waveCount > 0 ? true : events.length === 0 || events[events.length - 1].type === "turn";
    
    // 新しいTurnが始まる場合のみ追加
    if (isNewTurn) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          type: "turn",
          index: events.filter((item) => item.type === "turn").length, // ターン数のカウント
          number: events.filter((item) => item.type === "turn").length + 1,
          turn1: "1←技A",
          turn2: "1←技A",
          turn3: "1←技A",
          turn4: "1←技A",
        },
      ]);
    }
  };
  
  

  const handleSelectChange = (event) => {
    const selectedOptionText =
      event.target.options[event.target.selectedIndex].text;
    const turnProperty = event.target.name;
    const turnIndex = event.target.getAttribute("data-index");

    setEvents((prevEvents) =>
      prevEvents.map((event, index) => {
        if (event.type === "turn" && index === Number(turnIndex)) {
          return { ...event, [turnProperty]: selectedOptionText };
        } else {
          return event;
        }
      })
    );
  };

  const newWave = () => {
    const lastEvent = events[events.length - 1];
    if (lastEvent && lastEvent.type === "turn") {
      // 新しいWaveが始まる前に既存のWaveの最後のターンがあれば削除
      if (events.length > 0 && events[events.length - 1].type === "turn") {
        const newItems = [...events];
        newItems.pop(); // 最後の要素を削除
        setEvents(newItems);
      }
  
      // 新しいWaveが始まるときにwaveCountを正しく計算
      const waveCount = events.filter((item) => item.type === "wave").length + 1;
  
      setEvents([
        ...events,
        { type: "wave", index: waveCount - 1, number: waveCount },
      ]);
    }
  };
  
  

  const reset = () => {
    if (window.confirm("本当にリセットしますか？")) {
      setEvents([
        { type: "wave", index: 0 },
        { type: "turn", index: 0 },
      ]);
      setWaveIndex(0);
      setTurnIndex(0);
    }
  };

  const handleDelete = (index) => {
    const newItems = [...events];
    newItems.splice(index, 1);
  
    let waveCount = 0;
    let turnCount = 0;
  
    setEvents(
      newItems.map((item) => {
        if (item.type === "wave") {
          waveCount += 1;
          return { ...item, index: waveCount - 1, number: waveCount };
        } else if (item.type === "turn") {
          turnCount += 1;
          return { ...item, index: turnCount - 1, number: turnCount };
        } else {
          return item;
        }
      })
    );
  };
  

  useEffect(() => {
    console.log("チーム編成");
    console.log(inputValue);
    console.log("コマンドの中身");
    console.log(events);
    console.log("メンバー画像");
    console.log(imageSrcs);
    console.log("メモ");
    console.log(textareaValue);
  }, [events, imageSrcs, inputValue, textareaValue]);


// 保存成功後にMainpage.jsにリダイレクト
//const history = useHistory();
const navigate = useNavigate(); // useNavigateを使ってナビゲーションを管理
const [currentWaveNumber, setCurrentWaveNumber] = useState(0);
const [currentTurnNumber, setCurrentTurnNumber] = useState(0);

  const handleSave = () => {
    if (events.length > 0 && events[events.length - 1].type === "wave") {
      setCurrentWaveNumber((prev) => prev + 1);
    }
    const data = {
      teamName: inputValue.teamName,
      members: [
        { name: inputValue[1], imageSrc: imageSrcs.member1 },
        { name: inputValue[2], imageSrc: imageSrcs.member2 },
        { name: inputValue[3], imageSrc: imageSrcs.member3 },
        { name: inputValue[4], imageSrc: imageSrcs.member4 },
      ],
      commands: events.map((event) => {
        if (event.type === "wave") {
          return { type: 'wave', index: event.index };
        } else {
          return {
            type: 'turn',
            index: event.index,
            number: event.index + 1,
            text1: event.turn1,
            text2: event.turn2,
            text3: event.turn3,
            text4: event.turn4,
          };
        }
      }),
      memo: textareaValue,
      wave_number: currentWaveNumber,
      turn_number: currentTurnNumber,
    };
  
    
  axios.post("/teams", data)
  .then((response) => {
    console.log("Data saved", data);
    //history.push("/main"); // リダイレクト
    setCurrentTurnNumber((prev) => prev + 1);
    navigate("/main"); // リダイレクト
  })
  .catch((error) => {
    console.error("Error saving data", error);
  });
};

  return (
    <div className="Mainpage">
      <h1>編集ページ</h1>
      <form method="post">
        <div className="teamName">
          <label htmlFor="teamName">チーム名 :</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={inputValue.teamName}
            onChange={handleInputChange}
          />
        </div>

        <div className="teamMember">
          <ul>
            <li className="m1">
              <img
                alt="member1"
                src={imageSrcs.member1}
                onClick={() => handleImageUpload("member1")}
              />
              <input
                type="text"
                id="member"
                name="1"
                defaultValue={inputValue[1]}
                value={inputValue.member1}
                onChange={handleInputChange}
              />
            </li>
            <li className="m2">
              <img
                alt="member2"
                src={imageSrcs.member2}
                onClick={() => handleImageUpload("member2")}
              />
              <input
                type="text"
                id="member"
                name="2"
                defaultValue={inputValue[2]}
                value={inputValue.member2}
                onChange={handleInputChange}
              />
            </li>
            <li className="m3">
              <img
                alt="member3"
                src={imageSrcs.member3}
                onClick={() => handleImageUpload("member3")}
              />
              <input
                type="text"
                id="member"
                name="3"
                defaultValue={inputValue[3]}
                value={inputValue.member3}
                onChange={handleInputChange}
              />
            </li>
            <li className="m4">
              <img
                alt="member4"
                src={imageSrcs.member4}
                onClick={() => handleImageUpload("member4")}
              />
              <input
                type="text"
                id="member"
                name="4"
                defaultValue={inputValue[4]}
                value={inputValue.member4}
                onChange={handleInputChange}
              />
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
                      <p className="wave">
                        wave{item.index + 1}
                        <DeleteIcon
                          className="deleteIconW"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </DeleteIcon>
                      </p>
                    ) : (
                      <div className="turn">
                        <div className="turnNumber">{item.index + 1}</div>
                        <select
                          className="turn1"
                          name="turn1"
                          data-index={index}
                          onChange={handleSelectChange}
                        >
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
                        <select
                          className="turn2"
                          name="turn2"
                          data-index={index}
                          onChange={handleSelectChange}
                        >
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
                        <select
                          className="turn3"
                          name="turn3"
                          data-index={index}
                          onChange={handleSelectChange}
                        >
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
                        <select
                          className="turn4"
                          name="turn4"
                          data-index={index}
                          onChange={handleSelectChange}
                        >
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
                        <DeleteIcon
                          className="deleteIcon"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </DeleteIcon>
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
          <textarea
            defaultValue={textareaValue}
            value={textareaValue}
            onChange={handleTextareaChange}
          ></textarea>
        </div>

        <Button type="button" className="toMain" onClick={handleSave}>
          保存
        </Button>
      </form>
    </div>
  );
}

export default Edit;
