const env = require('dotenv').config();
const bodyParser = require('body-parser');

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3001

const db = mysql.createPool({

  host: env.parsed.DB_HOST,

  user: env.parsed.DB_USERNAME,

  password: env.parsed.DB_PASSWORD,

  database: env.parsed.DB_DATABASE,

	charset: 'utf8mb4'
});


app.get("/", (req, res) => {

  const sqlSelect = "SELECT * FROM items ORDER BY id";

  db.query(sqlSelect, (err, result) => {

      res.send(result);

  });

});

app.get("/api", (req,res)=>{
	res.json({message:"Hello World!"});
});

app.get("/sql", (req,res)=>{
  db.query(
    'SELECT * FROM `items`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results[0].name});
    }
	)
});

app.post('/team', async (req, res) => {
  try {
    const { teamName, members, commands, memberImages, memo } = req.body;

    // チーム情報を保存
    const [team] = await db.promise().query('INSERT INTO Team (teamName, memo) VALUES (?, ?)', [teamName, memo]);

    // メンバー情報を保存
    for (let i = 1; i <= 4; i++) {
      await db.promise().query('INSERT INTO Member (team_id, member_name, member_image) VALUES (?, ?, ?)', [team.insertId, members[i], memberImages[`member${i}`]]);
    }

    // コマンド情報を保存
    for (const command of commands) {
      await db.promise().query('INSERT INTO Command (team_id, type, command_index, number) VALUES (?, ?, ?, ?)', [team.insertId, command.type, command.command_index, command.number || null]);
    }

    res.status(200).send('Team data saved successfully');
  } catch (error) {
    console.error('Server-side error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})