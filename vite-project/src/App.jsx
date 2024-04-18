/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/signup/signup";
import NavBar from "./navBar/nav";
import Home from "./components/home/home";
import User from "./components/users/users";
import "./App.css";
import RequireAuth from "./components/auth/requireAuth";

function App() {
	const [currentForm, setCurrentForm] = useState("login");

	return (
		<div className="app">
			<BrowserRouter>
				<NavBar />
				<Routes>
					{/* public routes */}
					<Route path="/" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<h1> 404 page not found</h1>} />
					{/* private routes */}
					<Route element={<RequireAuth />}>
						<Route path="/home" element={<Home />} />
						<Route path="/myInfo" element={<User />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
