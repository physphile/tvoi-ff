import { Container, PageHeader } from '@/shared/ui';

import { Flex, Select } from '@gravity-ui/uikit';
import { useNavigate, useParams } from 'react-router';
import { LazyMap } from './ui';

export const MapPage = () => {
	const navigate = useNavigate();

	const params = useParams();
	const floor = Number(params.floor);
	const roomName = params.roomName;

	return (
		<>
			<PageHeader
				breadcrumbs={[
					{ href: '/map', label: 'Схема этажей' },
					{ href: `/map/${floor}`, label: `Этаж ${floor === 0 ? -1 : floor}` },
					{
						href: `/map/${floor}/${roomName}`,
						label: roomName,
						hide: !roomName,
					},
				]}
			/>
			<Container>
				<Flex gap={2} direction={'column'}>
					<Select
						size="xl"
						width={128}
						value={[floor.toString()]}
						onUpdate={([f]) => {
							navigate(`/map/${f}`);
						}}
						options={[-1, 1, 2, 3, 4, 5].map(f => ({
							content: `Этаж ${f}`,
							value: f === -1 ? '0' : f.toString(),
						}))}
					/>
					<LazyMap />
				</Flex>
			</Container>
		</>
	);
};
