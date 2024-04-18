/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import UseAxiosPrivte from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

export default function User() {
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
				});
				console.log(responce.data);
				isMounted && setUser(responce.data);
			} catch (e) {
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
			{user?.length ? (
				<ul>
					{user.map((users, i) => (
						<li key={i}> {user?.id}</li>
					))}
				</ul>
			) : (
				<p> No user to display </p>
			)}
		</article>
	);
}
