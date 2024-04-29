/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import UseAxiosPrivte from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import UseAuth from "../../hooks/useAuth";

export default function MyInfo() {
	const { auth } = UseAuth();
	const [user, setUser] = useState();
	const axiosPrivate = UseAxiosPrivte();
	const refresh = useRefreshToken();

	const REGISTER_URL = "/login/login";

	useEffect(() => {
		//
		let isMounted = true;
		// can cancle a request
		const controller = new AbortController();
		async function getUser() {
			console.log("in getUser frontend");
			try {
				const response = await axiosPrivate.get("/user/myInfo", {
					Signal: controller.signal,
					headers: { Authorization: `Bearer ${auth.token}` },
				});
				console.log("before response");
				console.log(`myInfo response: ${response.data}`);
				isMounted && setUser(response.data);
			} catch (e) {
				console.log("failed in users component");
				console.error(e);
			}
		}

		getUser();
		// clen up function runs as ismounted is set to false
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	return (
		<article>
			<h2>User Info</h2>
			{user && (
				<div>
					<p>Name: {user.name}</p>
					<p>Email: {user.email}</p>
					<p>Username: {user.username}</p>
					<p>Created Date: {new Date(user.createdDate).toLocaleString()}</p>
					{/* Add more fields as needed */}
				</div>
			)}
		</article>
	);
}
