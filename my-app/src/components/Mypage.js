import React,{ useEffect, useState } from "react";
import "../css/App.css";
import firebaseApp from "./fire";
import firestoreDB from "./fire";
import { collection, getDocs } from "firebase/firestore";
import AuthComponent from "./AuthComponent";

import { Link } from "react-router-dom";


function Mypage() {
  //useState初期設定
  const [todos, setTodos] = useState([]);

  //useEffectの処理
  useEffect(() => {

		//データ取得用配列
		const arrList = [];

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
    <div className="Mypage">
			<h1> マイページ </h1>
      <ul>
        {todos.map((todo) => {
					return(
          <li key={todo.id}>
            <div>タイトル：{todo.title}</div>
            <div>ステータス：{todo.status}</div>
            <div>詳細：{todo.shousai}</div>
          </li>
					);
        })}
      </ul>
			<Link to="/">戻る</Link>
    </div>
  );
}

export default Mypage;