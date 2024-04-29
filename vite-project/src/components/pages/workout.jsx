/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import preExistingMotionsData from "../../../../node/preloadMotions/preloadMotions.json";

export default function WorkoutForm() {
	const [workoutName, setWorkoutName] = useState("");
	const [selectedMotion, setSelectedMotion] = useState("");
	const [newMotion, setNewMotion] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [time, setTime] = useState(0);
	const [addedMotions, setAddedMotions] = useState([]);

	const handleAddMotion = () => {
		if (selectedMotion || newMotion.trim() !== "") {
			const motionToAdd = {
				name: selectedMotion || newMotion,
				sets: sets,
				reps: reps,
				time: time,
			};
			setAddedMotions([...addedMotions, motionToAdd]);
			setSelectedMotion("");
			setNewMotion("");
			setSets(0);
			setReps(0);
			setTime(0);
		}
	};

	const handleRemoveMotion = (index) => {
		const updatedMotions = [...addedMotions];
		updatedMotions.splice(index, 1);
		setAddedMotions(updatedMotions);
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
					value={workoutName}
					onChange={(e) => setWorkoutName(e.target.value)}
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
						onChange={(e) => setSelectedMotion(e.target.value)}
						className="mr-2 block flex-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
						className="block flex-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
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
					htmlFor="time"
					className="block text-sm font-medium text-gray-700"
				>
					Time (in seconds):
				</label>
				<input
					type="number"
					id="time"
					value={time}
					onChange={(e) => setTime(parseInt(e.target.value))}
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
						<div className="ml-2">Time: {motion.time} seconds</div>
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
		</div>
	);
}
