import logo from "./logo.svg";
import "./App.css";
import firebaseApp from "./fire";
import firestoreDB from "./fire";
import { collection, getDocs } from "firebase/firestore";
import AuthComponent from "./AuthComponent";
import { useEffect, useState } from "react";

function App() {
  //useState初期設定
  const [todos, setTodos] = useState([]);

  //データ取得用配列
  const arrList = [];

  //useEffectの処理
  useEffect(() => {
    const fireStorePostData = collection(firestoreDB, "todoposts");
    getDocs(fireStorePostData).then((snapShot) => {
      snapShot.forEach((docs) => {
        const doc = docs.data();
        arrList.push({
          id: docs.id,
          title: doc.title,
          status: doc.status,
          shousai: doc.shousai,
        });
      });
      setTodos(arrList);
    });
  }, []);

  return (
    <div className="App">
      <ul>
        {todos.map((todo) => {
					// return(
          <li key={todo.id}>
            <div>タイトル：{todo.title}</div>
            <div>ステータス：{todo.status}</div>
            <div>詳細：{todo.shousai}</div>
          </li>
					// );
        })}
      </ul>

      <h1> ログイン機能 </h1>
      <AuthComponent />
    </div>
  );
}

export default App;