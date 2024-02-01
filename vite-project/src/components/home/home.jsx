/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import User from "../users/users";

export default function Home() {
	const [authenticated, setauthenticated] = useState(null);

	return (
		<div>
			<h1>home page</h1>
			<br>
				<User />
			</br>
		</div>
	);
}
