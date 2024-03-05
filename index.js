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

app.use(express.json()); // to support JSON-encoded bodies

app.post('/edit', (req, res) => {
  console.log(req.body); // {inputValue: ..., textareaValue: ..., imageSrcs: ..., events: ...}
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})