import React, { useState, useEffect } from "react";
import "../css/App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Mainpage from "./Mainpage";
import Edit from "./Edit";
//import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <h1>純愛だよ</h1>

      <Router>
        
        <Routes>
          <Route path="/" element={<Mainpage />} />
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
