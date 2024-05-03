/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import UseAxiosPrivte from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import UseAuth from "../../hooks/useAuth";

export default function MyInfo() {
	const [userInfo, setUserInfo] = useState();
	const axiosPrivate = UseAxiosPrivte();
	const refresh = useRefreshToken();

	const REGISTER_URL = "/login/login";

	useEffect(() => {
		//
		let isMounted = true;
		// can cancle a request
		const controller = new AbortController();
		async function getUser() {
			//console.log("in getUser frontend");
			try {
				const response = await axiosPrivate.get("/user/myInfo", {
					Signal: controller.signal,
					//headers: { Authorization: `Bearer ${auth.token}` },
				});
				//console.log(`myInfo response: ${JSON.stringify(response.data)}`);
				isMounted && setUserInfo(response.data);
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
		<article className="bg-white rounded-md shadow-md p-6">
			<h2 className="text-lg font-semibold text-purple-700 mb-4">User Info</h2>
			{userInfo && (
				<div>
					<p className="text-gray-700">
						<span className="font-semibold">Name:</span> {userInfo.name}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Email:</span> {userInfo.email}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Username:</span> {userInfo.username}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Motion account created:</span>{" "}
						{userInfo.date
							? new Date(Date.parse(userInfo.date)).toLocaleString("en-US")
							: "Invalid Date"}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Workout Count:</span>{" "}
						{userInfo.workoutCount}
					</p>
					{/* Add more fields as needed */}
				</div>
			)}
		</article>
	);
}
