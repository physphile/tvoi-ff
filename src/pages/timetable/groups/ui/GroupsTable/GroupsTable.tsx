import { getGroupsGroupGetOptions } from '@/shared/api/timetable/@tanstack/react-query.gen';
import { useFavoriteGroups } from '@/shared/hooks';
import { Star, StarFill } from '@gravity-ui/icons';
import { Table, useTable } from '@gravity-ui/table';
import type { ColumnDef } from '@gravity-ui/table/tanstack';
import { Button, Icon } from '@gravity-ui/uikit';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

import type { GroupGet } from '@/shared/api/timetable';
import styles from './GroupsTable.module.css';

const staticColumns: ColumnDef<GroupGet>[] = [
	{
		accessorKey: 'id',
		header: 'id',
		maxSize: 80,
	},
	{
		accessorKey: 'number',
		header: 'Номер',
		maxSize: 80,
	},
	{
		accessorKey: 'name',
		header: 'Название',
		cell: ({ getValue }) => {
			return getValue<string>().replace('каф.', 'Кафедра ');
		},
	},
];

interface GroupsTableProps {
	search: string;
}

export const GroupsTable = ({ search }: GroupsTableProps) => {
	const navigate = useNavigate();

	const { data } = useQuery(
		getGroupsGroupGetOptions({ query: { limit: Number.MAX_SAFE_INTEGER } })
	);

	const groups = data?.items ?? [];

	const { favoriteGroups, addFavoriteGroup, removeFavoriteGroup } = useFavoriteGroups();

	const onFavoriteClick = useCallback(
		(groupId: number) => {
			if (favoriteGroups.has(groupId)) {
				removeFavoriteGroup(groupId);
			} else {
				addFavoriteGroup(groupId);
			}
		},
		[favoriteGroups, addFavoriteGroup, removeFavoriteGroup]
	);

	const columns = useMemo(() => {
		return [
			...staticColumns,
			{
				id: 'favorite',
				header: '',
				cell: ({ row }) => (
					<Button
						view="flat"
						size="xs"
						onClick={e => {
							e.stopPropagation();
							e.preventDefault();
							onFavoriteClick(row.getValue('id'));
						}}
					>
						<Icon data={favoriteGroups.has(row.getValue('id')) ? StarFill : Star} />
					</Button>
				),
			},
		];
	}, [onFavoriteClick, favoriteGroups]);

	const sortedData = useMemo(
		() =>
			groups
				.filter(n => !Number.isNaN(Number.parseInt(n.number)))
				.filter(
					({ number, name }) =>
						number.toLowerCase().includes(search.toLowerCase()) ||
						name?.toLowerCase().includes(search.toLowerCase())
				)
				.toSorted((a, b) => {
					if (a.number.includes('м') && !b.number.includes('м')) return 1;
					if (!a.number.includes('м') && b.number.includes('м')) return -1;
					return Number.parseInt(a.number) - Number.parseInt(b.number);
				})
				.toSorted((a, b) => {
					if (favoriteGroups.has(a.id) && !favoriteGroups.has(b.id)) return -1;
					if (!favoriteGroups.has(a.id) && favoriteGroups.has(b.id)) return 1;
					return 0;
				}),
		[groups, favoriteGroups, search]
	);

	const table = useTable({
		data: sortedData,
		columns,
	});

	return (
		<Table
			table={table}
			className={styles.table}
			size="s"
			key={favoriteGroups.size}
			onRowClick={({ getValue }) => {
				navigate(`/timetable/groups/${getValue('id')}`);
			}}
		/>
	);
};
