import { getAllAchievementsUserUserIdGetOptions } from '@/shared/api/achievement/@tanstack/react-query.gen';
import { getSessionsSessionGetOptions } from '@/shared/api/auth/@tanstack/react-query.gen';
import type { UserInfoUpdate } from '@/shared/api/userdata';
import {
	getUserInfoUserIdGetOptions,
	updateUserUserIdPostMutation,
} from '@/shared/api/userdata/@tanstack/react-query.gen';
import { useLoginData } from '@/shared/hooks';
import { PageHeader } from '@/shared/ui';
import { Container } from '@/shared/ui';
import { KeyValue } from '@/shared/ui/KeyValue';
import { dateTime } from '@gravity-ui/date-utils';
import { Card, Flex, Label, Skeleton, Text, spacing, useToaster } from '@gravity-ui/uikit';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemoizedFn } from 'ahooks';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileAvatar, ProfileDropdownMenu, UserdataCard } from './ui';

export const ProfilePage = () => {
	const [readonly, setReadonly] = useState(true);
	const { token, user_id, id: session_id } = useLoginData();
	const { data: userData, isLoading: isUserDataLoading } = useQuery(
		getUserInfoUserIdGetOptions({ auth: token, path: { id: user_id } })
	);

	const toaster = useToaster();

	const methods = useForm<UserInfoUpdate>({
		values: {
			items: userData?.items ?? [],
			source: 'user',
		},
	});

	const categories = useMemo(() => {
		return [...new Set(userData?.items.map(item => item.category) ?? [])];
	}, [userData]);

	const items = useMemo(() => {
		return userData?.items.map((item, index) => ({ ...item, index })) ?? [];
	}, [userData]);

	const { data: achievements, isLoading: isAchievementsLoading } = useQuery(
		getAllAchievementsUserUserIdGetOptions({ auth: token, path: { user_id } })
	);

	const { data: sessions } = useQuery(getSessionsSessionGetOptions({ auth: token }));

	const { mutate: updateUser } = useMutation({
		...updateUserUserIdPostMutation(),
		onError: error => {
			toaster.add({
				theme: 'danger',
				name: 'update-user-error',
				content: 'ru' in error ? (error.ru as string) : 'Неизвестная ошибка',
			});
		},
		onSuccess: () => {
			toaster.add({
				theme: 'success',
				name: 'update-user-success',
				content: 'Данные обновлены',
			});
			methods.reset();
			setReadonly(true);
		},
	});

	const onSubmit = useMemoizedFn((data: UserInfoUpdate) => {
		updateUser({ body: { items: data.items, source: 'user' }, path: { id: user_id }, auth: token });
	});

	return (
		<>
			<PageHeader
				breadcrumbs={[{ href: '/profile', label: 'Профиль' }]}
				actions={
					<Flex gap={2}>
						{/* {!readonly && (
							<Button
								onClick={() => {
									methods.reset(userData);
									setReadonly(true);
								}}
							>
								Отмена
							</Button>
						)}
						{readonly && (
							<Button
								view="action"
								onClick={() => {
									setReadonly(prev => !prev);
								}}
								loading={isLoading}
								type="button"
							>
								Редактировать
							</Button>
						)}
						{!readonly && (
							<Button view="action" loading={isUpdating} form="profile-form" type="submit">
								Сохранить
							</Button>
						)} */}
						<ProfileDropdownMenu />
					</Flex>
				}
			/>
			<Container
				aside={
					<Flex direction={'column'} gap={3}>
						<Card
							className={spacing({ p: 3 })}
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Text variant="subheader-2" className={spacing({ mb: 3 })}>
								Достижения
							</Text>
							{isAchievementsLoading ? (
								<Skeleton style={{ height: 18 }} />
							) : (
								<>
									{achievements?.achievement.length ? (
										<div
											style={{
												display: 'grid',
												gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
												gap: 10,
											}}
										>
											{achievements?.achievement
												.filter(({ picture }) => Boolean(picture))
												.map(({ id, name, picture }) => (
													<div key={id}>
														<img
															src={picture as string}
															alt={name ?? ''}
															style={{ display: 'flex', aspectRatio: 1 }}
														/>
													</div>
												))}
										</div>
									) : (
										<Text>Пока нет достижений</Text>
									)}
								</>
							)}
						</Card>
						<Card
							className={spacing({ p: 3 })}
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Text variant="subheader-2" className={spacing({ mb: 3 })}>
								Сессии
							</Text>
							{isUserDataLoading ? (
								<Skeleton style={{ height: 20 }} />
							) : (
								<Flex gap={1} direction={'column'}>
									{sessions?.map(({ id, last_activity, session_name }) => (
										<KeyValue
											key={id}
											title={
												<Flex alignItems={'center'} gap={1}>
													{id === session_id && <Label size="xs">Текущая</Label>}
													{session_name || 'Без имени'}
												</Flex>
											}
											value={dateTime({ input: `${last_activity}Z` }).fromNow()}
										/>
									))}
								</Flex>
							)}
						</Card>
					</Flex>
				}
			>
				<ProfileAvatar
					imgUrl={userData?.items.find(i => i.param === 'Фоо')?.value ?? 'kek'}
					name={userData?.items.find(i => i.param === 'Электронная почта')?.value ?? ''}
					className={spacing({ mb: 3 })}
					loading={isUserDataLoading}
				/>
				<FormProvider {...methods}>
					<form id="profile-form" onSubmit={methods.handleSubmit(onSubmit)}>
						<Flex direction={'column'} gap={3}>
							{isUserDataLoading ? (
								<>
									<Skeleton style={{ height: 82 }} />
									<Skeleton style={{ height: 82 }} />
								</>
							) : (
								categories?.map(category => (
									<UserdataCard
										items={items.filter(item => item.category === category)}
										category={category}
										readonly={readonly}
										key={category}
									/>
								))
							)}
						</Flex>
					</form>
				</FormProvider>
			</Container>
		</>
	);
};
