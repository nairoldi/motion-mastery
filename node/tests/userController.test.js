const request = require("supertest");
const { app } = require("../server.js");
require("dotenv").config();
const User = require("../user/userSchema.js");
const Motion = require("../user/userMotionSchema.js");
const Workout = require("../user/userWorkoutSchema.js");

userObject = {
	email: "test@email.com",
	pass: "testPass",
	user: "testUsername",
};

describe("POST /user/myInfo", () => {
	let authToken;
	beforeAll(async () => {
		try {
			// Perform signup
			await request(app).post("/login/signup").send(userObject);

			// Perform login to obtain auth token
			const loginResponse = await request(app)
				.post("/login/login")
				.send(userObject);

			// Extract accessToken from the login response body
			authToken = loginResponse.body.accessToken;

			// Verify that the token was correctly extracted
			console.log(`Extracted token: ${authToken}`);

			if (!authToken) {
				throw new Error(
					"Token not found. Check login response structure.",
				);
			}
		} catch (err) {
			console.error("Error during token extraction:", err);
			throw err; // Rethrow to fail the test if token extraction fails
		}
	});

	test("it should return the users info", async () => {
		console.log(`Token before setting the header: ${authToken}`);
		if (!authToken) {
			throw new Error("Token not found. Check login response structure.");
		}
		const response = await request(app)
			.get("/user/myInfo")
			.set("Authorization", `Bearer ${authToken}`);
		// Verify the authorization header was set correctly
		console.log(`Authorization Header sent: Bearer ${authToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				_id: expect.any(String),
				name: expect.any(String),
				username: expect.any(String),
				email: expect.any(String),
				date: expect.any(String),
				workoutCount: expect.any(Number),
			}),
		);
	});
});

describe("POST /user/createWorkout", () => {
	let authToken;

	beforeAll(async () => {
		try {
			// Perform signup and login to obtain auth token
			const userObject = {
				email: "test@email.com",
				pass: "testPass",
				user: "testUsername",
			};

			await request(app).post("/login/signup").send(userObject);

			const loginResponse = await request(app)
				.post("/login/login")
				.send(userObject);

			authToken = loginResponse.body.accessToken;
		} catch (err) {
			console.error("Error during setup:", err);
			throw err; // Rethrow to fail the test if setup fails
		}
	});

	test("it should create a new workout", async () => {
		try {
			const workoutData = {
				name: "Test Workout",
				motions: [
					{
						name: "Motion 1",
						primaryMuscle: "Biceps",
						secondaryMuscle: "Triceps",
						reps: 10,
						weight: 20,
						time: "5 minutes",
					},
					{
						name: "Motion 2",
						primaryMuscle: "Quadriceps",
						reps: 15,
						weight: 30,
					},
				],
			};

			const response = await request(app)
				.post("/user/createWorkout")
				.set("Authorization", `Bearer ${authToken}`)
				.send(workoutData);

			expect(response.status).toBe(201);
			expect(response.body.message).toBe("Workout created successfully");
			expect(response.body.workout).toBeDefined();
			expect(response.body.workout.user).toBeDefined(); // Ensure user ID is populated
			expect(response.body.workout.name).toBe(workoutData.name);

			// Optionally, add more assertions to validate motions array, etc.
		} catch (err) {
			console.error("Error during test:", err);
			throw err; // Rethrow to fail the test if any error occurs during the test
		}
	});

	afterAll(async () => {
		// Clean up after tests if necessary
		await User.deleteMany({});
		await Workout.deleteMany({});
		await Motion.deleteMany({});
	});
});
