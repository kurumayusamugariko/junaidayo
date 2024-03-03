import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import "../css/Edit.css";

import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from '@mui/icons-material/Delete';

function Edit() {
  const navigate = useNavigate();
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
	console.log("メンバー画像");
	console.log(imageSrcs);
  const [memo, setMemo] = useState(""); // memo ステートを追加


  //コマンド関係
  const [events, setEvents] = useState([
    { type: "wave", index: 0 },
    { type: "turn", index: 0 },
  ]);
  const [waveIndex, setWaveIndex] = useState(0);
  const [turnIndex, setTurnIndex] = useState(0);

  
  const newTurn = () => {
    const turnCount = events.filter(item => item.type === 'turn').length;
    setEvents([...events, { type: 'turn', index: turnCount, number: turnCount + 1 }]);
  };
  
  const newWave = () => {
    const lastEvent = events[events.length - 1];
    let waveCount = events.filter(item => item.type === 'wave').length;
  
    // 新しい wave イベントを追加する前に、既に存在する wave イベントの数を取得
    if (lastEvent && lastEvent.type === 'turn') {
      waveCount = events.filter(item => item.type === 'wave').length;
    }
  
    console.log('Adding new wave event:', { type: 'wave', index: waveCount, number: waveCount + 1 });
  
    setEvents([...events, { type: 'wave', index: waveCount, number: waveCount + 1 }]);
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
	
		setEvents(newItems.map((item, index) => {
			if (item.type === 'wave') {
				waveCount += 1;
				return {...item, index: waveCount - 1, number: waveCount};
			} else if (item.type === 'turn') {
				turnCount += 1;
				return {...item, index: turnCount - 1, number: turnCount};
			} else {
				return item;
			}
		}));
	};

  const [selectedOptions, setSelectedOptions] = useState(Array(events.length).fill('firstOption'));

  // handleSelectChange 関数を変更
  const handleSelectChange = (index, selectedValue) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      // indexが現在のnewOptionsの長さ以下の場合、そのまま更新、それ以外は新たに追加
      if (index < newOptions.length) {
        newOptions[index] = selectedValue;
      } else {
        newOptions.push(selectedValue);
      }
      return newOptions;
    });
  };
  

// 保存ボタンがクリックされた時の処理
// handleSave 関数の変更
const handleSave = async (e) => {
  e.preventDefault();

  try {
    // チーム名を取得
    const teamName = document.getElementById('teamName').value;

    // メンバー情報を取得
    const members = Array.from(document.querySelectorAll('.teamMember li')).map(member => ({
      name: member.querySelector('input').value,
      imageSrc: member.querySelector('img').src,
    }));

    // メモを取得
    const memo = document.querySelector('.memo textarea').value;

    // コマンド情報を取得
    const commands = events.map((event, index) => {
      if (event.type === 'wave') {
        return { type: 'wave', index: event.index, number: event.number };
      } else if (event.type === 'turn') {
        return {
          type: 'turn',
          index: event.index,
          number: event.number,
          text1: selectedOptions[index * 4] || '',   // デフォルトで空文字列を設定
          text2: selectedOptions[index * 4 + 1] || '',
          text3: selectedOptions[index * 4 + 2] || '',
          text4: selectedOptions[index * 4 + 3] || '',
        };
      }
    });

    console.log("データベースに送信するデータ:", { teamName, members, commands, memo });

    // サーバーにデータを送信
    const response = await fetch('/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamName, members, commands, memo }),
    });

    // サーバーからのレスポンスをログに出力
    if (response.ok) {
      console.log('データが保存されました。');
      // 画像パスの更新など、必要な処理を追加

      // /main にリダイレクト
      navigate("/main");
    } else {
      console.error('データの保存に失敗しました。', response.status, response.statusText);
      // エラーレスポンスの内容をログに出力
      const errorData = await response.json();
      console.error('エラーレスポンス:', errorData);
    }
  } catch (error) {
    console.error('エラー:', error);
  }
};

  console.log("コマンドの中身"); //コマンドの中身を確認
	console.log(events);

  
	useEffect(() => {
		console.log(events);
	}, [events]);

  return (
    <div className="Mainpage">
      <h1>編集ページ</h1>
      <form onSubmit={handleSave}>
        <div className="teamName">
          <label htmlFor="teamName">チーム名 :</label>
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
              <input type="text" id="member" defaultValue="東堂 幻" />
            </li>
            <li className="m2">
              <img
                alt="member2"
                src={imageSrcs.member2}
                onClick={() => handleImageUpload("member2")}
              />
              <input type="text" id="member" defaultValue="東堂 幻" />
            </li>
            <li className="m3">
              <img
                alt="member3"
                src={imageSrcs.member3}
                onClick={() => handleImageUpload("member3")}
              />
              <input type="text" id="member" defaultValue="東堂 幻" />
            </li>
            <li className="m4">
              <img
                alt="member4"
                src={imageSrcs.member4}
                onClick={() => handleImageUpload("member4")}
              />
              <input type="text" id="member" defaultValue="東堂 幻" />
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
												<DeleteIcon className="deleteIconW" onClick={() => handleDelete(index)}>Delete</DeleteIcon>
                      </p>
                    ) : (
                      <div className="turn">
                      <div className="turnNumber">{item.index + 1}</div>
                      <select
                        className={`turn turn${item.index}`}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
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
                        className={`turn turn${item.index}`}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
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
                        className={`turn turn${item.index}`}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
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
                        className={`turn turn${item.index}`}
                        onChange={(e) => handleSelectChange(index, e.target.value)}
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
												<DeleteIcon className="deleteIcon" onClick={() => handleDelete(index)}>Delete</DeleteIcon>
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
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)}></textarea>
        </div>

        <Link to="/main">
        <Button type="button" className="toMain" onClick={handleSave}>
        保存
      </Button>
        </Link>
      </form>
    </div>
  );
}

export default Edit;
