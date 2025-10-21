import { useLocalStorage } from "usehooks-ts";

import type { AuthBackendAuthMethodSessionSession } from "../api/auth";

export const useLoginData = () => {
	const [loginData, setLoginData, removeLoginData] = useLocalStorage<AuthBackendAuthMethodSessionSession>(
		"login_data",
		{} as AuthBackendAuthMethodSessionSession
	);

	return { ...loginData, removeLoginData, setLoginData };
};
