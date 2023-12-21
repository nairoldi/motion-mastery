/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Nav from "./navBar/nav";
import Home from "./components/home/home";
import "./App.css";

function App() {
	const [currentForm, setCurrentForm] = useState("login");

	return (
		<div className="app">
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/home" element={<Home />} />
					<Route path="*" element={<h1> 404 page not found</h1>} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
