import type { CheckUnionMemberIsUnionMemberGetData } from '@/shared/api/print';
import { updateUserUserIdPostMutation } from '@/shared/api/userdata/@tanstack/react-query.gen';
import { useLoginData } from '@/shared/hooks';
import { PageHeader } from '@/shared/ui/PageHeader';
import { Button, Flex, TextInput, useToaster } from '@gravity-ui/uikit';
import { useMutation } from '@tanstack/react-query';
import { useMemoizedFn } from 'ahooks';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getIsUnionMember } from './helpers';
export type PrinterLoginPageForm = CheckUnionMemberIsUnionMemberGetData['query'];

export const PrinterLoginPage = () => {
	const toaster = useToaster();
	const { user_id, token } = useLoginData();
	const navigate = useNavigate();

	const { register, handleSubmit } = useForm<PrinterLoginPageForm>({
		defaultValues: { surname: '', number: '' },
	});

	const { mutate: updateUser } = useMutation({
		...updateUserUserIdPostMutation(),
		onError: error => {
			// @ts-expect-error
			if (/Object Param (Фамилия|Номер профсоюзного билета) not found/i.test(error.message)) {
				toaster.add({
					theme: 'danger',
					name: 'no-union-member',
					content: 'Проверьте введенные данные',
				});
			}
		},
	});

	const onSubmit = useMemoizedFn(async (data: PrinterLoginPageForm) => {
		const isMember = await getIsUnionMember(data);

		if (isMember) {
			updateUser({
				path: {
					id: user_id,
				},
				auth: token,
				body: {
					items: [
						{ category: 'Личная информация', param: 'Фамилия', value: data.surname },
						{
							category: 'Учёба',
							param: 'Номер профсоюзного билета',
							value: data.number,
						},
					],
					source: 'user',
				},
			});

			navigate('/printer');
		} else {
			toaster.add({
				theme: 'danger',
				name: 'no-union-member',
				content: 'Проверьте введенные данные',
			});
		}
	});

	return (
		<>
			<PageHeader breadcrumbs={[{ href: '/printer', label: 'Принтер' }]} />
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ margin: 'auto', width: 'clamp(200px, 100%, 600px)' }}
			>
				<Flex direction="column" gap={3}>
					<TextInput {...register('surname')} size="xl" label="Фамилия" placeholder="Иванов" />
					<TextInput
						{...register('number')}
						size="xl"
						label="Номер профсоюзного билета"
						placeholder="1012000"
					/>
					<Button type="submit" view="action" size="xl">
						Отправить
					</Button>
				</Flex>
			</form>
		</>
	);
};
