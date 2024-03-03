// index.js などのファイル内

const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3001;

// MySQL 接続設定を追加
const db = mysql.createPool({
  host: env.parsed.DB_HOST,
  user: env.parsed.DB_USERNAME,
  password: env.parsed.DB_PASSWORD,
  database: env.parsed.DB_DATABASE,
  charset: 'utf8mb4', // ここで文字エンコーディングを指定
});
//app.use(bodyParser.json());
//app.use(bodyParser.json({ limit: '50mb' })); // 適切なサイズに調整する
//app.use(bodyParser.urlencoded({ extended: true }));
// 50MBまでのリクエストボディを許容
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/teams', async (req, res) => {
  try {
    const { teamName, members, commands, memo } = req.body;
    // デバッグ用: 受け取ったデータをコンソールに表示
    console.log('Received data:', { teamName, members, commands, memo });

    // チーム情報を Team テーブルに挿入
    const teamInsertResult = await db.promise().query('INSERT INTO Team (team_name, memo) VALUES (?, ?)', [teamName, memo]);
    const teamId = teamInsertResult[0].insertId;

    // メンバー情報を Member テーブルに挿入
    await Promise.all(members.map(async (member) => {
      await db.promise().query('INSERT INTO Member (team_id, name, image_path) VALUES (?, ?, ?)', [teamId, member.name, member.imageSrc]);
    }));

    // コマンド情報を Command テーブルに挿入(turn_numberを1にデフォルト設定)
    await Promise.all(commands.map(async (command) => {
      // number プロパティが undefined の場合、1 にデフォルトで設定
      const turnNumber = command.number !== undefined ? command.number : 1;

      await db.promise().query('INSERT INTO Command (team_id, wave_number, turn_number, command_text1, command_text2, command_text3, command_text4) VALUES (?, ?, COALESCE(?, 1), ?, ?, ?, ?)', [teamId, command.index, turnNumber, command.text1, command.text2, command.text3, command.text4]);
    }));



    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Server-side error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// /maindata エンドポイントを追加
app.get('/maindata', async (req, res) => {
  try {
    // データベースからチーム情報を取得
    const teamData = await db.promise().query('SELECT * FROM Team');

    // 取得したデータをクライアントに返す
    res.json({ message: 'Data retrieved successfully', data: teamData[0] });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});