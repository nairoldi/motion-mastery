/* eslint-disable no-unused-vars */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/useAuth";

export default function RequireAuth() {
	const { auth } = UseAuth();
	const location = useLocation();

	/* 
    if the user is logged in and has any token, return the Outlet(any child componet of require auth) 
    aka it will allow them to access protected routes 
    */
	return auth?.token ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location }} replace />
	);
}
