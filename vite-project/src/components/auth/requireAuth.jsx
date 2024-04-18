/* eslint-disable no-unused-vars */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";
const Secret = import.meta.env.jwtSecret;

export default function RequireAuth() {
	const { auth } = UseAuth();
	const location = useLocation();
	console.log("auth:", auth);
	/* 
    if the user is logged in and has any token, the outlet represents any child compnent nested inside. 
	these childern will be protected if the user is signed in 
	*/
	//might need to be token
	return auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
}
