/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useRef } from "react";
import axios from "../../api/axios";

export default function Login() {
	const REGISTER_URL = "/login/login";

	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const [errMsg, setErrMsg] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email);
		console.log(pass);

		try {
			const responce = await axios.post(
				REGISTER_URL,
				JSON.stringify({ email, pass }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			// responce from server
			console.log(responce.data);
			console.log(responce.accessToken);
			// full responce object
			console.log(JSON.stringify(responce));
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
			<div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl ">
				<p
					ref={errRef}
					className={errMsg ? "errmsg" : "offscreen"}
					aria-live="assertive"
				>
					{errMsg}
				</p>
				<h1 className="text-3xl font-semibold text-center text-purple-700 underline">
					Motion Mastery
				</h1>
				<h1 className="text-xl font-serif text-center text-purple-700">
					Sign In
				</h1>
				<form className="mt-6 " onSubmit={handleSubmit}>
					<div className="mb-2">
						<label
							htmlFor="email"
							className="block text-sm font-semibold text-gray-800"
						>
							Email
						</label>
						<input
							type="email"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							id="email"
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-2">
						<label className="block text-sm font-semibold text-gray-800">
							Password
						</label>
						<input
							type="password"
							className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
							id="password"
							onChange={(e) => setPass(e.target.value)}
							value={pass}
							required
						/>
					</div>
					<a href="#" className="text-xs text-purple-600 hover:underline">
						{" "}
						Forgot Password
					</a>
					<div className="mt-6">
						<button
							type="submit"
							className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
						>
							Login
						</button>
					</div>
				</form>
				<p className="mt-8 text-xs font-light text-center text-gray-700">
					{" "}
					Don't have an account?{" "}
					<a
						href="/signup"
						className="font-medium text-purple-600 hover:underline"
					>
						Sign up
					</a>
				</p>
			</div>
		</div>
	);
}
