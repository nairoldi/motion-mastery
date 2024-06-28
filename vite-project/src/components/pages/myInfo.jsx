/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import UseAuth from "../../hooks/useAuth";

export default function MyInfo() {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const axiosPrivate = UseAxiosPrivate();
	const refresh = useRefreshToken();

	const REGISTER_URL = "/login/login";

	useEffect(() => {
		const controller = new AbortController();
		async function getUser() {
			try {
				const response = await axiosPrivate.get("/user/myInfo", {
					signal: controller.signal,
				});
				setUserInfo(response.data);
			} catch (e) {
				console.log("failed in users component");
				console.error(e);
			} finally {
				setLoading(false);
			}
		}

		getUser();

		return () => {
			controller.abort();
		};
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!userInfo) {
		return <div>Error loading user info.</div>;
	}

	const dummyWorkouts = {
		previousWorkout: {
			name: "Chest and Triceps",
			motions: ["Bench Press", "Tricep Dips", "Chest Fly"],
		},
		favoritedWorkout: {
			name: "Full Body Workout",
			motions: ["Squat", "Pull-Up", "Deadlift"],
		},
	};

	return (
		<article className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-8">
			<h2 className="text-2xl font-bold text-purple-700 mb-6">
				User Info
			</h2>

			{/* Login Streak and Weight Change Section */}
			<div className="flex space-x-4 mb-6">
				<div className="bg-gray-100 p-4 rounded-lg w-1/2 shadow">
					<h3 className="text-lg font-semibold text-purple-700">
						Login Streak
					</h3>
					<p className="text-gray-800 mt-2">Streak: 10 days</p>
					<p className="text-gray-800">Total Logins: 150</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg w-1/2 shadow">
					<h3 className="text-lg font-semibold text-purple-700">
						Weight Change
					</h3>
					<p className="text-gray-800 mt-2">
						Weight Lost/Gained: 5 lbs
					</p>
				</div>
			</div>

			{/* User Info Section */}
			<div className="grid grid-cols-1 gap-4 mb-6">
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">Name:</span>{" "}
						{userInfo.name}
					</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">Email:</span>{" "}
						{userInfo.email}
					</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">Username:</span>{" "}
						{userInfo.username}
					</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">
							Motion account created:
						</span>{" "}
						{userInfo.date
							? new Date(
									Date.parse(userInfo.date)
							  ).toLocaleString("en-US")
							: "Invalid Date"}
					</p>
				</div>
				<div className="bg-gray-100 p-4 rounded-lg shadow flex items-center">
					<p className="text-gray-800">
						<span className="font-semibold">Workout Count:</span>{" "}
						{userInfo.workoutCount}
					</p>
				</div>
			</div>

			{/* Previous Workouts and Favorited Workouts Section */}
			<div className="flex space-x-4 mb-6">
				<a
					href="/previous-workouts"
					className="bg-gray-100 p-4 rounded-lg shadow w-1/2 hover:bg-gray-200"
				>
					<h3 className="text-lg font-semibold text-purple-700">
						Previous Workouts
					</h3>
					<p className="text-gray-800 mt-2">
						Last Workout: {dummyWorkouts.previousWorkout.name}
					</p>
					<ul className="text-gray-800 list-disc list-inside">
						{dummyWorkouts.previousWorkout.motions.map(
							(motion, index) => (
								<li key={index}>{motion}</li>
							)
						)}
					</ul>
				</a>
				<a
					href="/favorited-workouts"
					className="bg-gray-100 p-4 rounded-lg shadow w-1/2 hover:bg-gray-200"
				>
					<h3 className="text-lg font-semibold text-purple-700">
						Favorited Workouts
					</h3>
					<p className="text-gray-800 mt-2">
						Last Favorited: {dummyWorkouts.favoritedWorkout.name}
					</p>
					<ul className="text-gray-800 list-disc list-inside">
						{dummyWorkouts.favoritedWorkout.motions.map(
							(motion, index) => (
								<li key={index}>{motion}</li>
							)
						)}
					</ul>
				</a>
			</div>

			{/* Goals and Settings Links */}
			<div className="flex space-x-4">
				<Link
					to="/goals"
					className="bg-purple-700 text-white text-center py-2 px-4 rounded-lg shadow w-1/2 hover:bg-purple-900"
				>
					Go to Goals
				</Link>
				<Link
					to="/settings"
					className="bg-purple-700 text-white text-center py-2 px-4 rounded-lg shadow w-1/2 hover:bg-purple-900"
				>
					Go to Settings
				</Link>
			</div>
		</article>
	);
}
