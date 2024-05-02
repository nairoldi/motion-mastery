/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import preExistingMotionsData from "../../../../node/preloadMotions/preloadMotions.json";
import UseAxiosPrivte from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

export default function WorkoutForm() {
	const [workoutName, setWorkoutName] = useState("");
	const [selectedMotion, setSelectedMotion] = useState("");
	const [newMotion, setNewMotion] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [time, setTime] = useState(0);
	const [distance, setDistance] = useState(0);
	const [weight, setWeight] = useState(0);
	const [primaryMuscle, setPrimaryMuscle] = useState("");
	const [secondaryMuscle, setSecondaryMuscle] = useState("");
	const [addedMotions, setAddedMotions] = useState([]);

	// to set focus on the form when the components load
	const userRef = useRef();
	// set focus on first input when the component loads
	useEffect(() => {
		userRef.current.focus();
	}, []);

	const axiosPrivate = UseAxiosPrivte();
	//const refresh = useRefreshToken();

	const handleAddMotion = () => {
		if (selectedMotion || newMotion.trim() !== "") {
			const motionToAdd = {
				name: selectedMotion || newMotion,
				sets: sets,
				reps: reps,
				time: time,
				weight: weight,
				distance: distance,
				primaryMuscle: primaryMuscle,
				secondaryMuscle: secondaryMuscle,
			};
			setAddedMotions([...addedMotions, motionToAdd]);
			setSelectedMotion("");
			setNewMotion("");
			setSets(0);
			setReps(0);
			setTime(0);
			setDistance(0);
			setWeight(0);
			setPrimaryMuscle("");
			setSecondaryMuscle("");
		}
	};

	const handleRemoveMotion = (index) => {
		const updatedMotions = [...addedMotions];
		updatedMotions.splice(index, 1);
		setAddedMotions(updatedMotions);
	};

	const handleSubmit = async () => {
		let workoutData;
		if (addedMotions.length > 0) {
			workoutData = {
				name: workoutName,
				motions: addedMotions,
			};
		}

		console.log(`Data to be sent: ${JSON.stringify(workoutData)}`);

		try {
			const response = axiosPrivate.post("/user/createworkout", workoutData, {
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			});
			console.log("workoutCreated successfully", response.data);
			setAddedMotions([]);
			setSelectedMotion("");
			setNewMotion("");
			setSets(0);
			setReps(0);
			setTime(0);
			setDistance(0);
			setPrimaryMuscle("");
			setSecondaryMuscle("");
			setWorkoutName("");
		} catch (err) {
			console.error("Error creating workout:", err);
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-lg font-medium text-gray-900 mb-4">
				Create New Workout
			</h2>
			<div className="mb-4">
				<label
					htmlFor="workoutName"
					className="block text-sm font-medium text-gray-700"
				>
					Workout Name:
				</label>
				<input
					type="text"
					id="workoutName"
					ref={userRef}
					value={workoutName}
					onChange={(e) => setWorkoutName(e.target.value)}
					className="mt-1 text-center block  w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="motions"
					className="block text-sm font-medium text-gray-700"
				>
					Add Motions:
				</label>
				<div className="flex items-center mt-1">
					<select
						id="motions"
						value={selectedMotion}
						onChange={(e) => {
							setSelectedMotion(e.target.value);
							const selectedMotionData = preExistingMotionsData.find(
								(motion) => motion.name === e.target.value
							);
							if (selectedMotionData) {
								setPrimaryMuscle(selectedMotionData.primaryMuscle);
								setSecondaryMuscle(selectedMotionData.secondaryMuscle);
							}
						}}
						className="mr-2 block flex-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
					>
						<option value="">Select a pre-existing motion</option>
						{preExistingMotionsData.map((motion, index) => (
							<option key={index} value={motion.name}>
								{motion.name}
							</option>
						))}
					</select>
					<input
						type="text"
						id="newMotion"
						value={newMotion}
						onChange={(e) => setNewMotion(e.target.value)}
						placeholder="Or type a new motion"
						className="block flex-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
					/>
				</div>
			</div>
			<div className="mb-4">
				<label
					htmlFor="primaryMuscle"
					className="block text-sm font-medium text-gray-700"
				>
					Primary Muscle:
				</label>
				<input
					type="text"
					id="primaryMuscle"
					value={primaryMuscle}
					onChange={(e) => setPrimaryMuscle(e.target.value)}
					placeholder="Primary Muscle"
					className="block flex-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="secondaryMuscle"
					className="block text-sm font-medium text-gray-700"
				>
					Secondary Muscle:
				</label>
				<input
					type="text"
					id="secondaryMuscle"
					value={secondaryMuscle}
					onChange={(e) => setSecondaryMuscle(e.target.value)}
					placeholder="Secondary Muscle"
					className="block flex-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="sets"
					className="block text-sm font-medium text-gray-700"
				>
					Sets:
				</label>
				<input
					type="number"
					id="sets"
					value={sets}
					onChange={(e) => setSets(parseInt(e.target.value))}
					className="w-20 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="reps"
					className="block text-sm font-medium text-gray-700"
				>
					Reps:
				</label>
				<input
					type="number"
					id="reps"
					value={reps}
					onChange={(e) => setReps(parseInt(e.target.value))}
					className="w-20 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="sets"
					className="block text-sm font-medium text-gray-700"
				>
					weight (in pounds):
				</label>
				<input
					type="number"
					id="weight"
					value={weight}
					onChange={(e) => setWeight(parseInt(e.target.value))}
					className="w-20 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="time"
					className="block text-sm font-medium text-gray-700"
				>
					Time (in minutes):
				</label>
				<input
					type="number"
					id="time"
					value={time}
					onChange={(e) => setTime(parseInt(e.target.value))}
					className="w-20 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="sets"
					className="block text-sm font-medium text-gray-700"
				>
					Distance (in miles):
				</label>
				<input
					type="number"
					id="sets"
					value={distance}
					onChange={(e) => setDistance(parseInt(e.target.value))}
					className="w-20 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>

			<div>
				<button
					type="button"
					onClick={handleAddMotion}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Add Motion
				</button>
			</div>

			<div className="mt-4">
				{addedMotions.map((motion, index) => (
					<div
						key={index}
						className="flex items-center bg-gray-100 px-3 py-1 rounded-md mb-2"
					>
						<div className="flex-1">{motion.name}</div>
						<div className="ml-2">Sets: {motion.sets}</div>
						<div className="ml-2">Reps: {motion.reps}</div>
						<div className="ml-2">Time: {motion.time} minutes`</div>
						<div className="ml-2">Time: {motion.weight} pounds</div>
						<button
							type="button"
							onClick={() => handleRemoveMotion(index)}
							className="ml-2 px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Remove
						</button>
					</div>
				))}
			</div>
			<div className="mt-4">
				<button
					type="button"
					onClick={handleSubmit}
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Finish Creating Workout
				</button>
			</div>
		</div>
	);
}
