import { getUserInfoUserIdGet } from "@/shared/api/userdata";

export const getPrinterLoginData = async () => {
	const loginData = localStorage.getItem("login_data");

	if (!loginData) {
		return undefined;
	}

	const { token, user_id } = JSON.parse(loginData);

	const { data } = await getUserInfoUserIdGet({
		auth: token,
		path: { id: user_id },
	});

	const surname = data?.items.find(item => item.param === "Фамилия")?.value;
	const number = data?.items.find(item => item.param === "Номер профсоюзного билета")?.value;

	return { number, surname };
};
