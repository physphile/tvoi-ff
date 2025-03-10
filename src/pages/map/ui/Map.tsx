import { Minus, Plus } from '@gravity-ui/icons';
import { Button, Card, Flex, Icon } from '@gravity-ui/uikit';
import Konva from 'konva';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Layer, Rect, Stage, Text } from 'react-konva';
import { useNavigate, useParams } from 'react-router';
import useImage from 'use-image';
import { useResizeObserver } from 'usehooks-ts';
import { cursorPointer, floors } from '../constants';
import { useQuery } from '@tanstack/react-query';
import {
	getEventsEventGetOptions,
	getRoomsRoomGetOptions,
} from '@/shared/api/timetable/@tanstack/react-query.gen';
import { dateTime } from '@gravity-ui/date-utils';
import XmarkIcon from '@gravity-ui/icons/svgs/xmark.svg';

const POPOVER_EVENTS_GAP = 4;
const POPOVER_PADDING_X = 4;
const POPOVER_PADDING_TOP = 8;
const POPOVER_PADDING_BOTTOM = 4;
const POPOVER_TITLE_FONT_SIZE = 8;
const POPOVER_TITLE_MARGIN = 4;
const POPOVER_EVENT_PADDING = 4;
const POPOVER_WIDTH = 90;
const POPOVER_MIN_HEIGHT = 90;
const POPOVER_EVENT_FONT_SIZE = 5;
const POPOVER_EVENT_HEIGHT = POPOVER_EVENT_FONT_SIZE * 3 + POPOVER_EVENT_PADDING * 2;
const POPOVER_OFFSET_X = -14;

interface Point {
	x: number;
	y: number;
}

Konva.hitOnDragEnabled = true;

const getCenter = (p1: Point, p2: Point) => {
	return {
		x: (p1.x + p2.x) / 2,
		y: (p1.y + p2.y) / 2,
	};
};

const getDistance = (p1: Point, p2: Point) => {
	return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
};

export const MapComponent = () => {
	const navigate = useNavigate();
	const ref = useRef<HTMLDivElement | null>(null);
	const stageRef = useRef<Konva.Stage | null>(null);
	const [xmark] = useImage(XmarkIcon);

	const params = useParams();
	const floor = Number(params.floor);
	const roomName = params.roomName;
	const selectedRoom = useMemo(
		() => floors[floor].find(room => room.name === roomName),
		[floor, roomName]
	);

	const { data: roomData } = useQuery({
		...getRoomsRoomGetOptions({ query: { limit: 1, query: roomName } }),
		enabled: Boolean(roomName),
	});

	const roomId = roomData?.items?.[0]?.id;

	const { data: eventsData, isLoading: isEventsLoading } = useQuery({
		...getEventsEventGetOptions({
			query: {
				room_id: roomId,
				start: dateTime().add(1, 'day').format('YYYY-MM-DD'),
				end: dateTime().add(2, 'day').format('YYYY-MM-DD'),
			},
		}),
		enabled: Boolean(roomId),
	});

	const events = eventsData?.items ?? [];

	useEffect(() => {
		if (selectedRoom) {
			stageRef.current?.position({ x: -selectedRoom.x, y: -selectedRoom.y });
		}
	}, [selectedRoom]);

	const [image] = useImage(`/map/floor${floor}.webp`);

	const { width = 0 } = useResizeObserver({
		// @ts-expect-error
		ref,
		box: 'border-box',
	});

	const [lastCenter, setLastCenter] = useState<Point | null>(null);
	const [lastDist, setLastDist] = useState(0);
	const [dragStopped, setDragStopped] = useState(false);
	const [scale, setScale] = useState(2);

	const pinch = useCallback(
		(e: Konva.KonvaEventObject<TouchEvent>) => {
			e.evt.preventDefault();
			const touch1 = e.evt.touches[0];
			const touch2 = e.evt.touches[1];
			const stage = e.target;

			// we need to restore dragging, if it was cancelled by multi-touch
			if (touch1 && !touch2 && !stage.isDragging() && dragStopped) {
				stage.startDrag();
				setDragStopped(false);
			}

			if (touch1 && touch2) {
				// if the stage was under Konva's drag&drop
				// we need to stop it, and implement our own pan logic with two pointers
				if (stage.isDragging()) {
					setDragStopped(true);
					stage.stopDrag();
				}

				const p1 = {
					x: touch1.clientX,
					y: touch1.clientY,
				};
				const p2 = {
					x: touch2.clientX,
					y: touch2.clientY,
				};

				if (!lastCenter) {
					setLastCenter(getCenter(p1, p2));
					return;
				}
				const newCenter = getCenter(p1, p2);

				const dist = getDistance(p1, p2);

				if (!lastDist) {
					setLastDist(dist);
				}

				// local coordinates of center point
				const pointTo = {
					x: (newCenter.x - stage.x()) / scale,
					y: (newCenter.y - stage.y()) / scale,
				};

				const newScale = scale * (dist / lastDist);

				setScale(newScale);

				// calculate new position of the stage
				const dx = newCenter.x - lastCenter.x;
				const dy = newCenter.y - lastCenter.y;

				const newPos = {
					x: newCenter.x - pointTo.x * scale + dx,
					y: newCenter.y - pointTo.y * scale + dy,
				};

				stage.position(newPos);

				setLastDist(dist);
				setLastCenter(newCenter);
			}
		},
		[dragStopped, lastCenter, lastDist, scale]
	);

	return (
		<Card ref={ref} style={{ position: 'relative' }}>
			<Stage
				scale={{ x: scale, y: scale }}
				width={width}
				height={500}
				ref={stageRef}
				onTouchMove={pinch}
				onTouchEnd={() => {
					setLastDist(0);
					setLastCenter(null);
				}}
				draggable
			>
				<Layer>
					<Image image={image} width={480.52} height={239.29} />
				</Layer>
				<Layer>
					{floors[floor].map(room => (
						<Rect
							{...cursorPointer}
							strokeWidth={1}
							fill={room.name === roomName ? '#ec9a0050' : undefined}
							stroke={room.name === roomName ? '#ec9a00' : '#759bff'}
							{...room}
							key={room.name}
							onPointerClick={() => {
								navigate(`/map/${floor}/${room.name}`);
							}}
						/>
					))}
				</Layer>
				<Layer>
					{selectedRoom && (
						<>
							<Rect
								x={selectedRoom.x + selectedRoom.width + POPOVER_OFFSET_X}
								y={selectedRoom.y + selectedRoom.height}
								fill="white"
								width={POPOVER_WIDTH}
								height={Math.max(
									POPOVER_PADDING_TOP +
										POPOVER_TITLE_FONT_SIZE +
										POPOVER_TITLE_MARGIN +
										POPOVER_EVENT_HEIGHT * events.length +
										POPOVER_EVENTS_GAP * (events.length - 1) +
										POPOVER_PADDING_BOTTOM,
									POPOVER_MIN_HEIGHT
								)}
								shadowOffsetX={0}
								shadowOffsetY={1}
								shadowBlur={5}
								shadowColor="black"
								shadowOpacity={0.15}
								cornerRadius={8}
							/>
							<Rect
								fill="white"
								width={12}
								height={12}
								strokeWidth={0.5}
								stroke="#0000001a"
								onPointerClick={() => navigate(`/map/${floor}`)}
								onPointerEnter={e => {
									const container = e.target.getStage()?.container();
									if (container) {
										container.style.cursor = 'pointer';
									}
									e.target.to({ stroke: '#759bff', duration: 0.1, strokeWidth: 1 });
								}}
								onPointerLeave={e => {
									e.target.to({ stroke: '#0000001a', duration: 0.1, strokeWidth: 0.5 });
									const container = e.target.getStage()?.container();
									if (container) {
										container.style.cursor = 'default';
									}
								}}
								cornerRadius={2}
								x={
									selectedRoom.x +
									selectedRoom.width +
									POPOVER_OFFSET_X +
									POPOVER_WIDTH -
									12 -
									POPOVER_PADDING_X
								}
								y={selectedRoom.y + selectedRoom.height + POPOVER_PADDING_TOP - 3}
							/>
							<Image
								image={xmark}
								width={12}
								height={12}
								opacity={0.5}
								x={
									selectedRoom.x +
									selectedRoom.width +
									POPOVER_OFFSET_X +
									POPOVER_WIDTH -
									12 -
									POPOVER_PADDING_X
								}
								y={selectedRoom.y + selectedRoom.height + POPOVER_PADDING_TOP - 3}
								listening={false}
							/>
							<Text
								x={selectedRoom.x + selectedRoom.width + POPOVER_PADDING_X + POPOVER_OFFSET_X}
								y={selectedRoom.y + selectedRoom.height + POPOVER_PADDING_TOP}
								text={selectedRoom.name}
								fontSize={POPOVER_TITLE_FONT_SIZE}
								height={POPOVER_TITLE_FONT_SIZE}
								fontFamily="Inter"
								fontWeight="bold"
								fill="black"
							/>
							{isEventsLoading ? (
								<Text
									x={selectedRoom.x + selectedRoom.width + POPOVER_PADDING_X + POPOVER_OFFSET_X}
									y={
										selectedRoom.y +
										selectedRoom.height +
										POPOVER_PADDING_TOP +
										POPOVER_TITLE_FONT_SIZE +
										POPOVER_TITLE_MARGIN
									}
									text="Загрузка..."
									fontSize={6}
									fontFamily="Inter"
									fill="black"
								/>
							) : events.length > 0 ? (
								events.map((event, index) => (
									<Fragment key={event.id}>
										<Rect
											x={selectedRoom.x + selectedRoom.width + POPOVER_PADDING_X + POPOVER_OFFSET_X}
											y={
												selectedRoom.y +
												selectedRoom.height +
												POPOVER_PADDING_TOP +
												POPOVER_TITLE_FONT_SIZE +
												POPOVER_TITLE_MARGIN +
												index * (POPOVER_EVENT_HEIGHT + POPOVER_EVENTS_GAP)
											}
											width={POPOVER_WIDTH - POPOVER_PADDING_X * 2}
											height={POPOVER_EVENT_HEIGHT}
											stroke="#0000001a"
											strokeWidth={0.5}
											cornerRadius={4}
											onPointerEnter={e => {
												const container = e.target.getStage()?.container();
												if (container) {
													container.style.cursor = 'pointer';
												}
												e.target.to({ stroke: '#759bff', duration: 0.1, strokeWidth: 1 });
											}}
											onPointerLeave={e => {
												e.target.to({ stroke: '#0000001a', duration: 0.1, strokeWidth: 0.5 });
												const container = e.target.getStage()?.container();
												if (container) {
													container.style.cursor = 'default';
												}
											}}
											onPointerClick={() => {
												navigate(`/timetable/events/${event.id}`);
											}}
										/>
										<Text
											x={
												selectedRoom.x +
												selectedRoom.width +
												POPOVER_PADDING_X +
												POPOVER_EVENT_PADDING +
												POPOVER_OFFSET_X
											}
											y={
												selectedRoom.y +
												selectedRoom.height +
												POPOVER_PADDING_TOP +
												POPOVER_TITLE_FONT_SIZE +
												POPOVER_TITLE_MARGIN +
												POPOVER_EVENT_PADDING +
												index * (POPOVER_EVENT_HEIGHT + POPOVER_EVENTS_GAP)
											}
											width={POPOVER_WIDTH - (POPOVER_PADDING_X + POPOVER_EVENT_PADDING) * 2}
											text={`${dateTime({ input: event.start_ts }).format('HH:mm')} ${event.name}`}
											fontSize={POPOVER_EVENT_FONT_SIZE}
											fontFamily="Inter"
											fontWeight={700}
											fill="black"
											listening={false}
										/>
									</Fragment>
								))
							) : (
								<Text
									x={selectedRoom.x + selectedRoom.width + POPOVER_PADDING_X + POPOVER_OFFSET_X}
									y={
										selectedRoom.y +
										selectedRoom.height +
										POPOVER_PADDING_TOP +
										POPOVER_TITLE_FONT_SIZE +
										POPOVER_TITLE_MARGIN
									}
									width={POPOVER_WIDTH - POPOVER_PADDING_X * 2}
									text="Сегодня нет пар"
									fontSize={6}
									fontFamily="Inter"
									fill="black"
								/>
							)}
						</>
					)}
				</Layer>
			</Stage>
			<Flex
				direction="column"
				gap={2}
				style={{
					position: 'absolute',
					top: '50%',
					right: 16,
					transform: 'translateY(-50%)',
				}}
			>
				<Button
					view="action"
					size="xl"
					onClick={() => {
						setScale(scale * 1.125);
					}}
				>
					<Icon data={Plus} />
				</Button>
				<Button
					view="action"
					size="xl"
					onClick={() => {
						setScale(scale / 1.125);
					}}
				>
					<Icon data={Minus} />
				</Button>
			</Flex>
		</Card>
	);
};
