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
    const connection = await db.promise().getConnection();
  
    try {
      await connection.beginTransaction();
  
      const { teamName, members, commands, memo } = req.body;
  
      // チーム情報を Team テーブルに挿入
      const teamInsertResult = await connection.query('INSERT INTO Team (team_name, memo) VALUES (?, ?)', [teamName, memo]);
      const teamId = teamInsertResult[0].insertId;
  
      // メンバー情報を Member テーブルに挿入
      await Promise.all(members.map(async (member) => {
        await connection.query('INSERT INTO Member (team_id, name, image_path) VALUES (?, ?, ?)', [teamId, member.name, member.imageSrc]);
      }));
  
      // コマンド情報を Command テーブルに挿入(turn_numberを1にデフォルト設定)
      await Promise.all(commands.map(async (command, commandIndex) => {
        // number プロパティが undefined の場合、1 にデフォルトで設定
        const turnNumber = command.number !== undefined ? command.number : 1;
  
        // WaveごとにTurnがある場合は、WaveとTurnの情報を正しく保存
        if (command.type === "wave") {
          await connection.query('INSERT INTO Command (team_id, wave_number, turn_number) VALUES (?, ?, ?)', [teamId, command.index, null]);
        } else {
          await connection.query('INSERT INTO Command (team_id, wave_number, turn_number, command_text1, command_text2, command_text3, command_text4) VALUES (?, ?, ?, ?, ?, ?, ?)', [teamId, commandIndex, turnNumber, command.text1, command.text2, command.text3, command.text4]);
        }
      }));
  
      // 新しいTeamのIDでコマンドテーブルからcommand_text1がnullまたは空の行を削除
      await connection.query('DELETE FROM Command WHERE team_id = ? AND (command_text1 IS NULL OR command_text1 = "")', [teamId]);
  
      await connection.commit();
  
      res.status(200).send('Data saved successfully');
    } catch (error) {
      await connection.rollback();
      console.error('Server-side error:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      connection.release();
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
app.get('/main/latest', async (req, res) => {
  try {
    
    // 最新のTeamIDを取得
    const latestTeam = await db.promise().query('SELECT id FROM Team ORDER BY id DESC LIMIT 1');
    const latestTeamId = latestTeam[0][0].id;

    // チーム情報を取得
    const teamData = await db.promise().query('SELECT * FROM Team WHERE id = ?', [latestTeamId]);

    // メンバー情報を取得
    const memberData = await db.promise().query('SELECT * FROM Member WHERE team_id = ?', [latestTeamId]);

    // コマンド情報を取得
    const commandData = await db.promise().query('SELECT * FROM Command WHERE team_id = ? AND command_text1 IS NOT NULL AND command_text1 != "" AND command_text1 != "undefined" ORDER BY wave_number, turn_number', [latestTeamId]);
    //const commandData = await db.promise().query('SELECT * FROM Command WHERE team_id = ? ORDER BY wave_number, turn_number', [latestTeamId]);

    // 取得したデータをクライアントに返す
    res.json({ message: 'Data retrieved successfully', teamData: teamData[0], memberData: memberData[0], commandData: commandData[0] });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});