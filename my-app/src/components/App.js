import React,{ useEffect, useState } from "react";
import "../css/App.css";
//firebase
import firebaseApp from "./fire";
import firestoreDB from "./fire";
import { collection, getDocs } from "firebase/firestore";
import AuthComponent from "./AuthComponent";

//コンポーネント
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mypage from './Mypage';


function App() {
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
    <div className="App">
      <h1> 純愛だよ </h1>
      

		<Router>
			<Link className="link" to="/Auth" element={<AuthComponent />}>
				<button>ログイン</button>
			</Link>
			{/* <AuthComponent/> */}
			<Link to="/mypage" element={<Mypage />}>
				<button>マイページ</button>
			</Link>

			<Routes>
				<Route path="/Auth" element={<AuthComponent />} />
				<Route path="/mypage" element={<Mypage />} />
			</Routes>
    </Router>

    </div>
  );
}

export default App;
