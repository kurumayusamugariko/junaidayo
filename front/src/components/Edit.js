import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Edit.css";
import axios from "axios";

import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";

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

  //sqlから表示
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    setTextareaValue(textareaValue);
  }, [textareaValue]);
  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };

  //画像関係
  const [imageSrcs, setImageSrcs] = useState({
    member1: "kobusi.png",//kobusi.png
    member2: "inu.png",//inu.png
    member3: "kugi.png",//kugi.png
    member4: "kakuseiki.png",//kakuseiki.png
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

  //コマンド関係
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
    const turnCount = events.filter((item) => item.type === "turn").length;
    setEvents([
      ...events,
      {
        type: "turn",
        index: turnCount,
        number: turnCount + 1,
        turn1: "1←技A",
        turn2: "1←技A",
        turn3: "1←技A",
        turn4: "1←技A",
      },
    ]);
  };

  function handleSelectChange(event) {
    const selectedOptionText =
      event.target.options[event.target.selectedIndex].text;
    const turnProperty = event.target.name; // 'turn1', 'turn2', 'turn3', 'turn4'
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
  }

  const newWave = () => {
    const lastEvent = events[events.length - 1];
    if (lastEvent && lastEvent.type === "turn") {
      const waveCount = events.filter((item) => item.type === "wave").length;
      setEvents([
        ...events,
        { type: "wave", index: waveCount, number: waveCount + 1 },
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

  const handleDelete = (index) => {
    const newItems = [...events];
    newItems.splice(index, 1);

    let waveCount = 0;
    let turnCount = 0;

    setEvents(
      newItems.map((item, index) => {
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

	const API_URL = process.env.API_URL || "https://junaidayo-vm2tzccgea-uc.a.run.app/api/edit";

  const handleSave = () => {
		fetch(`${API_URL}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				inputValue: inputValue,
				textareaValue: textareaValue,
				imageSrcs: imageSrcs,
				events: events,
			}),
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
  };

  return (
    <div className="Mainpage">
      
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
                          className="turn"
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
                          className="turn"
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
                          className="turn"
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
                          className="turn"
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
            defaultValue="memo"
            value={textareaValue}
            onChange={handleTextareaChange}
          ></textarea>
        </div>

        <Link to="/main">
          <Button type="submit" className="toMain" onClick={handleSave}>
            保存
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default Edit;
