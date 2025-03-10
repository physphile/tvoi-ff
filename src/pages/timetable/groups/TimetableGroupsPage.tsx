import { Container, PageHeader } from '@/shared/ui';
import { Flex, TextInput } from '@gravity-ui/uikit';
import { useState } from 'react';
import { GroupsTable } from './ui';

export const TimetableGroupsPage = () => {
	const [search, setSearch] = useState('');

	return (
		<>
			<PageHeader
				breadcrumbs={[
					{ label: 'Расписание', href: '/timetable' },
					{ label: 'Группы', href: '/timetable/groups' },
				]}
			/>
			<Container>
				<Flex direction={'column'} gap={3}>
					<TextInput placeholder="Поиск группы" value={search} onUpdate={setSearch} />
					<GroupsTable search={search} />
				</Flex>
			</Container>
		</>
	);
};
