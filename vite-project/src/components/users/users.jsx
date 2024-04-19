/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import UseAxiosPrivte from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import UseAuth from "../../hooks/useAuth";

export default function User() {
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
				const responce = await axiosPrivate.get("/user/myInfo", {
					Signal: controller.signal,
					//headers: { Authorization: `Bearer ${auth.token}` },
				});
				console.log("before responce");
				console.log(`myInfo responce: ${responce.data}`);
				isMounted && setUser(responce.data);
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
			<h2>Users List</h2>
			<h1></h1>
			<br />
		</article>
	);
}
