import { getUserInfoUserIdGet } from '@/shared/api/userdata';

export const getPrinterLoginData = async () => {
	const loginData = localStorage.getItem('login_data');

	if (!loginData) {
		return null;
	}

	const { user_id, token } = JSON.parse(loginData);

	const { data } = await getUserInfoUserIdGet({
		path: { id: user_id },
		auth: token,
	});

	const surname = data?.items.find(item => item.param === 'Фамилия')?.value;
	const number = data?.items.find(item => item.param === 'Номер профсоюзного билета')?.value;

	return { surname, number };
};
