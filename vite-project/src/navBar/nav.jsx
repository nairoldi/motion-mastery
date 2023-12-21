/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<Link to="/home"> Home </Link>
		</nav>
	);
}

export default Nav;
