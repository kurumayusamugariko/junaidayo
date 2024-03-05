import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "../css/Main.css";

//マテリアルUI
import Button from "@mui/material/Button";

function Mainpage() {
  const [data, setData] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState({
		0: { memberName: "", imageSrc: "" },
		1: { memberName: "", imageSrc: "" },
		2: { memberName: "", imageSrc: "" },
		3: { memberName: "", imageSrc: "" },
	});
  const [commands, setCommands] = useState([]);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    fetch("/data")
      .then((response) => response.json())
      .then((data) => {
        const sqldata = data;
        console.log(sqldata);
        setData(data);
        if (data.teams && data.teams.length >= 0) {
          setTeamName(sqldata.teams[0].teamName);
          setMemo(sqldata.teams[0].textareaValue);
        }
        if (data.members && data.members.length >= 0) {
          setMembers(sqldata.members);
        }
        if (data.commands && data.commands.length >= 0) {
          setCommands(sqldata.commands);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="Mainpage">
      <div className="teamName">
        <h3>{teamName}</h3>
      </div>

      <Link to="/edit">
        <Button className="toEdit" variant="contained">
          編集
        </Button>
      </Link>

      <div className="teamMember">
        <img className="m1" alt="１" src={members[0].imageSrc}></img>
        <img className="m2" alt="２" src={members[1].imageSrc}></img>
        <img className="m3" alt="３" src={members[2].imageSrc}></img>
        <img className="m4" alt="４" src={members[3].imageSrc}></img>
      </div>

      <div className="Names">
        <p className="name">{members[0].memberName}</p>
        <p className="name">{members[1].memberName}</p>
        <p className="name">{members[2].memberName}</p>
        <p className="name">{members[3].memberName}</p>
      </div>

      <div className="command-container">
        <div className="command">
          {commands.map((command, index) => {
            if (command.type === "wave") {
              return <div className="wave">wave{command.eventIndex + 1}</div>;
            } else if (command.type === "turn") {
              return (
                <div className="turn-container">
                  <div className="turn">
                    <div className="turnNumber">{command.eventIndex + 1}</div>
                    <div className="first t">{command.turn1}</div>
                    <div className="second t">{command.turn2}</div>
                    <div className="third t">{command.turn3}</div>
                    <div className="forth t">{command.turn4}</div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="memo">
        <p className="contents">memo</p>
        <p>{memo}</p>
      </div>

      <Link to="/" className="link">
        <Button className="toMain">戻る</Button>
      </Link>
    </div>
  );
}

export default Mainpage;
