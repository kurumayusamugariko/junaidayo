// Mainpage.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Main.css";
import Button from "@mui/material/Button";

function Mainpage() {
  const [teamData, setTeamData] = useState({ team_name: "", memo: ""});
  console.log("teamData");
  console.log(teamData);
  const [memberData, setMemberData] = useState([
    { id: 1, team_id: 1, name: "", image_path: "okkotu.jpg" },
    { id: 2, team_id: 1, name: "", image_path: "okkotu.jpg" },
    { id: 3, team_id: 1, name: "", image_path: "okkotu.jpg" },
    { id: 4, team_id: 1, name: "", image_path: "okkotu.jpg" },
  ]);
  const [commandData, setCommandData] = useState([
    {
      id: 1,
      team_id: 1,
      wave_number: 0,
      turn_number: 1,
      command_text1: "1←技A",
      command_text2: "1←技A",
      command_text3: "1←技A",
      command_text4: "1←技A",
    },
  ]);
  console.log("commandData");
  console.log(commandData);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/main/latest") // エンドポイントを修正
      .then((res) => res.json())
      .then((data) => {
        setTeamData(data.teamData.team_name || {});
        setMemberData(data.memberData || []);
        setCommandData(data.commandData || []);
        setTeamData(data.teamData.memo ? data.teamData.memo : "");
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="Mainpage">
      <div className="teamName">
        <h3>{teamData.team_name}</h3>
      </div>

      <div className="toEdit">
        <Link to="/edit">
          <Button>編集</Button>
        </Link>
      </div>

      <div className="teamMember">
        {memberData.map((member) => (
          <img key={member.id} alt={member.name} src={member.image_path} />
        ))}
      </div>

      <div className="command-container">
        {commandData.map((command) => (
          <div key={command.id} className="command">
            {command.type === "wave" ? (
            <div className="wave">wave{command.wave_number + 1}</div>
            ):(
            <div className="turn-container">
              <div className="turn">
                <div className="turnNumber">{command.turn_number}</div>
                <div className="first t">{command.command_text1}</div>
                <div className="second t">{command.command_text2}</div>
                <div className="third t">{command.command_text3}</div>
                <div className="forth t">{command.command_text4}</div>
              </div>
            </div>
            )}
          </div>
        ))}
      </div>

      <div className="memo">
        <p className="contents">memo</p>
        <p>{teamData.memo}</p>
      </div>

      <Link to="/" className="link">
        <Button className="toMain">戻る</Button>
      </Link>
    </div>
  );
}

export default Mainpage;
