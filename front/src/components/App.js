import React, { useState, useEffect } from "react";
import "../css/App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Mainpage from "./Mainpage";

function App() {
  // const [message, setMessage] = useState('');
  // useEffect(() => {
  // 	fetch('/sql')
  // 	.then((res) => res.json())
  // 	.then((data) => setMessage(data.message));
  // },[])
  return (
    <div className="App">
      <h1>純愛だよ</h1>
      <Router>
        <Link className="link" to="/main" element={<Mainpage />}>メインページ</Link>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// <Router>
// <Link className="link" to="/Auth" element={<AuthComponent />}>
// 	<button>ログイン</button>
// </Link>
// {/* <AuthComponent/> */}
// <Link to="/mypage" element={<Mypage />}>
// 	<button>マイページ</button>
// </Link>

// <Routes>
// 	<Route path="/Auth" element={<AuthComponent />} />
// 	<Route path="/mypage" element={<Mypage />} />
// </Routes>
// </Router>
