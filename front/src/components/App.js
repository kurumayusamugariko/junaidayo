import React,{useState,useEffect} from 'react'
import '../css/App.css';

function App() {
	const [message, setMessage] = useState('');
	useEffect(() => {
		fetch('/sql')
		.then((res) => res.json())
		.then((data) => setMessage(data.message));
	},[])
  return (
    <div className="App">
			<h1>フロントエンド</h1>
			<p>{ message }</p>
		</div>
  );
}

export default App;
