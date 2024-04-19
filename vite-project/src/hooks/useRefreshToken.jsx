/* eslint-disable no-unused-vars */
import UseAuth from "./useAuth";
import axios from "../api/axios";

export default function useRefreshToken() {
	const { setAuth } = UseAuth();

	const REGISTER_URL = "/auth/";

	const refresh = async () => {
		// with credentials true allows us to send cookies with our request
		const responce = await axios.get(REGISTER_URL, { withCredentials: true });

		setAuth((prev) => {
			console.log("userefreshtoken");
			console.log(JSON.stringify(prev));
			console.log(responce.data.accessToken);
			return { ...prev, accessToken: responce.data.accessToken };
		});
		return responce.data.accessToken;
	};
	return refresh;
}
