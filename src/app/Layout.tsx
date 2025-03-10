import {
	ArrowRightToSquare,
	Gear,
	LayoutHeaderCellsLarge,
	MapPin,
	Person,
	Persons,
	Printer,
} from '@gravity-ui/icons';
import { UnableToDisplay } from '@gravity-ui/illustrations';
import { AsideHeader, FooterItem, MobileHeader } from '@gravity-ui/navigation';
import { Flex, Text, ToasterComponent } from '@gravity-ui/uikit';
import { useCallback, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import styles from './Layout.module.css';
import { Settings } from './ui';

const logo = {
	text: 'Твой ФФ!',
	iconSrc: '/icon.svg',
	iconClassName: styles.icon,
};

const renderContent = () => (
	<ErrorBoundary
		fallback={
			<Flex
				alignItems={'center'}
				justifyContent={'center'}
				height={'100%'}
				direction={'column'}
				gap={2}
			>
				<UnableToDisplay />
				<Text variant="header-1">Something went wrong</Text>
			</Flex>
		}
	>
		<Flex
			direction={'column'}
			style={{ height: '100%', containerType: 'inline-size', maxHeight: '100%' }}
		>
			<Outlet />
		</Flex>
		<ToasterComponent />
	</ErrorBoundary>
);

export const Layout = () => {
	const navigate = useNavigate();

	const location = useLocation();

	const [compact, setCompact] = useState(false);
	const [showSettings, setShowSettings] = useState(false);

	const [loginData] = useLocalStorage('login_data', null);

	const isMobile = useMediaQuery('(max-width: 768px)');

	const items = useMemo(
		() => [
			{
				id: 'timetable',
				onItemClick: () => {
					setShowSettings(false);
					navigate('/timetable');
				},
				title: 'Расписание',
				icon: LayoutHeaderCellsLarge,
				current: !showSettings && location.pathname.startsWith('/timetable'),
			},
			{
				id: 'map',
				onItemClick: () => {
					setShowSettings(false);
					navigate('/map');
				},
				title: 'Схема этажей',
				icon: MapPin,
				current: !showSettings && location.pathname.startsWith('/map'),
			},
			{
				id: 'printer',
				onItemClick: () => {
					setShowSettings(false);
					navigate('/printer');
				},
				title: 'Принтер',
				icon: Printer,
				current: !showSettings && location.pathname.startsWith('/printer'),
			},
			{
				id: 'rating',
				onItemClick: () => {
					setShowSettings(false);
					navigate('/rating');
				},
				title: 'Дубинушка',
				icon: Persons,
				current: !showSettings && location.pathname.startsWith('/rating'),
			},
		],
		[navigate, showSettings, location.pathname]
	);

	const renderFooter = useCallback(
		() => (
			<>
				<FooterItem
					compact={compact}
					item={{
						id: 'settings',
						onItemClick: () => setShowSettings(prev => !prev),
						title: 'Настройки',
						icon: Gear,
						current: showSettings,
					}}
				/>
				{loginData ? (
					<FooterItem
						compact={compact}
						item={{
							id: 'profile',
							onItemClick: () => {
								setShowSettings(false);
								navigate('/profile');
							},
							title: 'Профиль',
							icon: Person,
							current: !showSettings && location.pathname.startsWith('/profile'),
						}}
					/>
				) : (
					<FooterItem
						compact={compact}
						item={{
							id: 'login',
							onItemClick: () => {
								setShowSettings(false);
								navigate('/login');
							},
							title: 'Вход / Регистрация',
							icon: ArrowRightToSquare,
							current: location.pathname.startsWith('/login'),
						}}
					/>
				)}
			</>
		),
		[loginData, compact, navigate, showSettings, location.pathname]
	);

	const panelItems = useMemo(
		() => [{ id: 'kek', visible: showSettings, children: <Settings /> }],
		[showSettings]
	);

	if (isMobile) {
		return (
			<MobileHeader
				burgerMenu={{ items, renderFooter }}
				logo={logo}
				renderContent={renderContent}
				panelItems={panelItems}
				onClosePanel={() => setShowSettings(false)}
				contentClassName={styles.content}
				className={styles.mobileHeader}
			/>
		);
	}

	return (
		<AsideHeader
			compact={compact}
			onChangeCompact={setCompact}
			logo={logo}
			menuItems={items}
			renderContent={renderContent}
			renderFooter={renderFooter}
			panelItems={panelItems}
			onClosePanel={() => setShowSettings(false)}
		/>
	);
};
