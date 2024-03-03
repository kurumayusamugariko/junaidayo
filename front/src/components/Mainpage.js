import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Main.css";

// マテリアルUI
import Button from "@mui/material/Button";

function Mainpage() {
  const [teamData, setTeamData] = useState({
    teamName: "漏瑚対策",
    members: [
      { name: "東堂 幻", imageSrc: "okkotu.jpg" },
      { name: "東堂 幻", imageSrc: "okkotu.jpg" },
      { name: "東堂 幻", imageSrc: "okkotu.jpg" },
      { name: "東堂 幻", imageSrc: "okkotu.jpg" },
    ],
    commands: [
      {
        type: "wave",
        index: 0,
        number: 1,
      },
      {
        type: "turn",
        index: 0,
        number: 1,
        commands: [
          { wave: 1, text: "技A" },
          { wave: 1, text: "技A" },
          { wave: 1, text: "技A" },
          { wave: 1, text: "技A" },
        ],
      },
    ],
    message: "デフォルトメッセージ",
  });

  useEffect(() => {
    fetch("/maindata")
      .then((res) => res.json())
      .then((data) => setTeamData(data));
  }, []);

  return (
    <div className="Mainpage">
      <div className="teamName">
        <h3>{teamData.teamName}</h3>
      </div>

      <div className="toEdit">
        <Link to="/edit">
          <Button>編集</Button>
        </Link>
      </div>

      <div className="teamMember">
        {teamData.members.map((member, index) => (
          <img key={index} className={`m${index + 1}`} alt={`メンバー${index + 1}`} src={member.imageSrc} />
        ))}
      </div>

      <div className="command-container">
        {teamData.commands.map((command, index) => (
          <div key={index} className="command">
            {command.type === "wave" ? (
              <div className="wave">{`wave${command.index + 1}`}</div>
            ) : (
              <div className="turn-container">
                <div className="turn">
                  <div className="turnNumber">{command.number}</div>
                  {/* ここでコマンド情報の表示を追加 */}
                  {command.commands.map((cmd, cmdIndex) => (
                    <div key={cmdIndex} className="t">{`${cmd.wave}←${cmd.text}`}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="memo">
        <p className="contents">memo</p>
        <p>{teamData.message}</p>
      </div>

      <Link to="/" className="link">
        <Button className="toMain">戻る</Button>
      </Link>
    </div>
  );
}

export default Mainpage;
