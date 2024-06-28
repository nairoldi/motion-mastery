/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login/login";
import Signup from "./components/signup/signup";
import NavBar from "./navBar/nav";
import Home from "./components/home/home";
import MyInfo from "./components/pages/myInfo";
import Workout from "./components/pages/workout";
import "./App.css";
import RequireAuth from "./components/auth/requireAuth";
import Layout from "./components/layout/layout";
import Heatmap from "./components/pages/stats";
import Goals from "./components/pages/goals";

function App() {
	const [currentForm, setCurrentForm] = useState("login");

	return (
		<div className="app">
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/" element={<Layout />}>
						{/* public routes */}
						<Route path="/" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route
							path="*"
							element={<h1> 404 page not found</h1>}
						/>
						{/* private routes */}
						<Route element={<RequireAuth />}>
							<Route path="/home" element={<Home />} />
							<Route path="/myInfo" element={<MyInfo />} />
							<Route path="/workouts" element={<Workout />} />
							<Route path="/stats" element={<Heatmap />} />
							<Route path="/goals" element={<Goals />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
