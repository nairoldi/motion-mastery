/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function User() {
	const [user, setUser] = useState();

	useEffect(() => {
		let isMounted = true;
		// can cancle a request
		const controller = new AbortController();
		const getUser = async () => {
			try {
				const responce = axios.get("/user/myInfo", {
					Signal: controller.signal,
				});
				console.log(responce.data);
				isMounted && setUser(responce.data);
			} catch (e) {
				console.error(e);
			}
		};

		getUser();

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
