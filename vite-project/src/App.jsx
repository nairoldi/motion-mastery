/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import "./App.css";

function App() {
	const [currentForm, setCurrentForm] = useState("login");

	return (
		<div className="app">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<h1> 404 page not found</h1>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
