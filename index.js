const env = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: env.parsed.DB_HOST,

  user: env.parsed.DB_USERNAME,

  password: env.parsed.DB_PASSWORD,

  database: env.parsed.DB_DATABASE,

  charset: "utf8mb4",
});

app.get("/", (req, res) => {
  const sqlSelect = "SELECT * FROM Commands ORDER BY id";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/data", async (req, res) => {
  const [maxTeamId] = await db.promise().query("SELECT MAX(id) as maxId FROM Team");
  const maxId = maxTeamId[0].maxId;
	console.log("maxId:", maxId);
  const [teams] = await db.promise().query("SELECT * FROM Team WHERE id = ?", [maxId]);
  const [members] = await db.promise().query("SELECT * FROM Members WHERE teamId = ?", [maxId]);
  const [commands] = await db.promise().query("SELECT * FROM Commands WHERE teamId = ? ORDER BY `id`", [maxId]);

  res.json({ teams, members, commands });
});

// to support JSON-encoded bodies

app.post("/edit", async (req, res) => {
  const data = req.body;
  console.log("ここだよ:", data);
  const teamData = {
    teamName: data.inputValue.teamName,
    textAreaValue: data.textareaValue,
  };
  // Insert into Team table
  let sql = "INSERT INTO Team SET ?";
  let query = db.promise().query(sql, teamData);
  let result = await query;
  let teamId = result[0].insertId;

  // Insert into Members table
  for (let i = 1; i <= 4; i++) {
    let memberData = {
      teamId: teamId,
      memberName: data.inputValue[i.toString()],
      imageSrc: data.imageSrcs["member" + i],
    };
    sql = "INSERT INTO Members SET ?";
    query = db.promise().query(sql, memberData);
    await query;
  }

  // Insert into Events table
  for (let event of data.events) {
    console.log(event.index);
    let eventData = {
      teamId: teamId,
      type: event.type,
      eventIndex: event.index,
      turn1: event.turn1,
      turn2: event.turn2,
      turn3: event.turn3,
      turn4: event.turn4,
    };
    sql = "INSERT INTO Commands SET ?";
    query = db.promise().query(sql, eventData);
    await query;
  }

  res.json(req.body);
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
