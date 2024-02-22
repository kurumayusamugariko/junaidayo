require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3001

const db = mysql.createPool({

  host: 'localhost',

  user: 'root',

  password: 'password',

  database: 'junaidayo',

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

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})