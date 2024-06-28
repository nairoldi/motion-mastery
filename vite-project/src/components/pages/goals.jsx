import { useState, useEffect } from "react";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
// eslint-disable-next-line no-unused-vars
import axios from "../../api/axios";

export default function Goals() {
	const [userInfo, setUserInfo] = useState(null);
	const axiosPrivate = UseAxiosPrivate();

	useEffect(() => {
		async function fetchUserInfo() {
			try {
				const userInfoResponce = await axiosPrivate.get("/user/myInfo");
				setUserInfo(userInfoResponce.data);
			} catch (error) {
				console.error("Failed to fetch user info:", error);
			}
		}

		fetchUserInfo();
	}, [axiosPrivate]);

	const handleWeightChange = (type) => {
		const newWeight = prompt(`Enter new ${type}:`);
		if (newWeight) {
			// Update the weight in the backend (implement this function)
			updateWeight(type, newWeight);
		}
	};

	const updateWeight = async (type, newWeight) => {
		try {
			await axiosPrivate.patch(`/user/updateWeight`, {
				[type]: newWeight,
			});
			setUserInfo({ ...userInfo, [type]: newWeight });
		} catch (error) {
			console.error("Failed to update weight:", error);
		}
	};

	const handleWeeklyGoalChange = (event) => {
		const newGoal = event.target.value;
		// Update the weekly goal in the backend (implement this function)
		updateWeeklyGoal(newGoal);
	};

	const updateWeeklyGoal = async (newGoal) => {
		try {
			await axiosPrivate.patch(`/user/updateWeeklyGoal`, {
				weeklyGoal: newGoal,
			});
			setUserInfo({ ...userInfo, weeklyGoal: newGoal });
		} catch (error) {
			console.error("Failed to update weekly goal:", error);
		}
	};

	if (!userInfo) {
		return <div>Loading...</div>;
	}

	return (
		<div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-purple-700 mb-6">Goals</h2>

			<div className="grid grid-cols-1 gap-4 mb-6">
				<div
					className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
					onClick={() => handleWeightChange("startingWeight")}
				>
					<p className="text-gray-800">
						<span className="font-semibold">Starting Weight:</span>{" "}
						{userInfo.startingWeight} lbs
					</p>
				</div>
				<div
					className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
					onClick={() => handleWeightChange("currentWeight")}
				>
					<p className="text-gray-800">
						<span className="font-semibold">Current Weight:</span>{" "}
						{userInfo.currentWeight} lbs
					</p>
				</div>
				<div
					className="bg-gray-100 p-4 rounded-lg shadow cursor-pointer"
					onClick={() => handleWeightChange("goalWeight")}
				>
					<p className="text-gray-800">
						<span className="font-semibold">Goal Weight:</span>{" "}
						{userInfo.goalWeight} lbs
					</p>
				</div>
			</div>

			<div className="bg-gray-100 p-4 rounded-lg shadow mb-6">
				<label className="block text-gray-700 font-semibold mb-2">
					Weekly Goal:
				</label>
				<select
					className="block w-full mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
					value={userInfo.weeklyGoal}
					onChange={handleWeeklyGoalChange}
				>
					<option value="lose 0.5 lbs per week">
						Lose 0.5 lbs per week
					</option>
					<option value="lose 1 lb per week">
						Lose 1 lb per week
					</option>
					<option value="lose 1.5 lbs per week">
						Lose 1.5 lbs per week
					</option>
					<option value="lose 2 lbs per week">
						Lose 2 lbs per week
					</option>
					<option value="maintain weight">Maintain weight</option>
					<option value="gain 0.5 lbs per week">
						Gain 0.5 lbs per week
					</option>
					<option value="gain 1 lb per week">
						Gain 1 lb per week
					</option>
				</select>
			</div>
		</div>
	);
}
