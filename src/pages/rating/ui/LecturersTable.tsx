import type { LecturerGet } from '@/shared/api/rating';
import { getLecturersLecturerGetOptions } from '@/shared/api/rating/@tanstack/react-query.gen';
import { formatNumber } from '@/shared/helpers';
import { getLabelNumberColor } from '@/shared/helpers/getLabelNumberColor';
import { Table, useTable } from '@gravity-ui/table';
import type { ColumnDef, SortingState } from '@gravity-ui/table/tanstack';
import { Flex, Label, Loader, Pagination, Select, Text, TextInput } from '@gravity-ui/uikit';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './LecturersTable.module.css';

const SUBJECTS = [
	'Атомный практикум',
	'Астрометрия',
	'Атомная физика',
	'Английский язык',
	'Астрофизика',
	'Теория вероятностей',
	'Введение в квантовую физику',
	'Введение в численные методы и математическое моделирование в физике',
	'Математический анализ',
	'Математическая обработка наблюдений',
	'Аналитическая геометрия',
];

const subjectsSelectOptions = SUBJECTS.map(subject => ({
	content: subject,
	value: subject,
}));

const columns: ColumnDef<LecturerGet>[] = [
	{
		accessorKey: 'last_name',
		header: 'Фамилия',
	},
	{
		accessorKey: 'first_name',
		header: 'Имя',
	},
	{
		accessorKey: 'middle_name',
		header: 'Отчество',
	},
	{
		accessorKey: 'mark_weighted',
		header: 'Оценка',
		minSize: 80,
		cell: ({ row }) => {
			const mark = row.original.mark_weighted;

			if (mark) {
				return <Label theme={getLabelNumberColor(mark)}>{formatNumber(mark)}</Label>;
			}

			return <Text color="secondary">Нет оценки</Text>;
		},
	},
	{
		accessorKey: 'subjects',
		header: 'Предметы',
		enableSorting: false,
		cell: ({ row }) => {
			return (
				<Flex gap={1}>
					{row.original.subjects?.filter(Boolean).map(subject => (
						<Label key={subject}>{subject}</Label>
					))}
				</Flex>
			);
		},
	},
];

export const LecturersTable = () => {
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(20);
	const [sorting, setSorting] = useState<SortingState>([{ id: 'mark_weighted', desc: true }]);
	const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
	const [search, setSearch] = useState('');

	const { data, isLoading } = useQuery(
		getLecturersLecturerGetOptions({
			query: {
				info: ['mark'],
				limit: pageSize,
				offset: (page - 1) * pageSize,
				// @ts-expect-error
				order_by: sorting[0]?.id,
				asc_order: sorting[0]?.desc === undefined ? undefined : !sorting[0].desc,
				name: search,
				subject: selectedSubjects[0],
			},
		})
	);

	const lecturers = useMemo(() => {
		return data?.lecturers ?? [];
	}, [data]);

	const table = useTable({
		columns,
		data: lecturers,
		enableSorting: true,
		manualSorting: true,
		onSortingChange: setSorting,
		state: { sorting },
	});

	return (
		<Flex direction="column" gap={3}>
			<Flex gap={3}>
				<TextInput
					value={search}
					onUpdate={value => {
						setPage(1);
						setSearch(value);
					}}
					placeholder="Поиск преподавателя"
					style={{ maxWidth: 500 }}
				/>
				<Select
					className={styles.select}
					value={selectedSubjects}
					options={subjectsSelectOptions}
					label="Предмет"
					onUpdate={value => {
						setSelectedSubjects(value);
						setPage(1);
					}}
					hasClear
				/>
			</Flex>
			{isLoading ? (
				<Flex
					justifyContent="center"
					alignItems="center"
					style={{ height: (pageSize + 1) * 32 + pageSize * 2 }}
				>
					<Loader size="l" />
				</Flex>
			) : (
				<div style={{ overflowX: 'auto' }}>
					<Table
						table={table}
						size="s"
						onRowClick={row => {
							navigate(`/rating/lecturer/${row.original.id}`);
						}}
					/>
				</div>
			)}
			<Pagination
				total={data?.total ?? 0}
				page={page}
				pageSize={pageSize}
				onUpdate={(p, ps) => {
					if (ps !== pageSize) {
						setPage(1);
						setPageSize(ps);
					} else {
						setPage(p);
					}
				}}
				pageSizeOptions={[10, 20, 50, 100]}
				showInput
				showPages
			/>
		</Flex>
	);
};
