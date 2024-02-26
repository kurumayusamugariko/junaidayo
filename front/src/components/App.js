import React, { useState, useEffect } from "react";
import "../css/App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TeamList from "./TeamList";
import Mainpage from "./Mainpage";
import Edit from "./Edit";

function App() {
  return (
    <div className="App">
      <h1>純愛だよ</h1>
			<TeamList/>
      <Router>
        <Link className="link" to="/main" element={<Mainpage />}>メインページ</Link>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
					<Route path="/edit" element={<Edit />} />
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
