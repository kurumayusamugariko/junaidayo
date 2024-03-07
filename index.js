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

app.get("/", async (req, res) => {
  const sqlSelect = "SELECT * FROM Commands ORDER BY id";

  try {
    const [result] = await db.promise().query(sqlSelect);
    res.json(result);
  } catch (err) {
		console.log(err);
    res.status(500).json({ error: err.message });
  }
});

db.getConnection((err, connection) => {
  if(err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database with thread id ' + connection.threadId);
  connection.release();
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/data", async (req, res) => {
	try{
		const [maxTeamId] = await db.promise().query("SELECT MAX(id) as maxId FROM Team");
		const maxId = maxTeamId[0].maxId;
		
		const [teams] = await db.promise().query("SELECT * FROM Team WHERE id = ?", [maxId]);
		const [members] = await db.promise().query("SELECT * FROM Members WHERE teamId = ?", [maxId]);
		const [commands] = await db.promise().query("SELECT * FROM Commands WHERE teamId = ? ORDER BY `id`", [maxId]);
	
		res.json({ teams, members, commands });
	}catch(err){
		res.status(500).json({ error: err.message });
	}
  
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
let memberPromises = [];
for (let i = 1; i <= 4; i++) {
  let memberData = {
    teamId: teamId,
    memberName: data.inputValue[i.toString()],
    imageSrc: data.imageSrcs["member" + i],
  };
  sql = "INSERT INTO Members SET ?";
  query = db.promise().query(sql, memberData);
  memberPromises.push(query);
}
await Promise.all(memberPromises);

// Insert into Events table
let eventPromises = [];
for (let event of data.events) {
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
  eventPromises.push(query);
}
await Promise.all(eventPromises);
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
