import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/login';
import { MapPage } from '@/pages/map';
import { PrinterLoginPage, PrinterPage } from '@/pages/printer';
import { checkPrinterAvailable } from '@/pages/printer/helpers/checkPrinterAvailable';
import { ProfilePage } from '@/pages/profile';
import { LecturerRatingPage, RatingPage } from '@/pages/rating';
import {
	TimetableEventPage,
	TimetableEventsPage,
	TimetableGroupPage,
	TimetableGroupsPage,
	TimetableLecturerPage,
	TimetableRoomPage,
} from '@/pages/timetable';
import { approveEmailEmailApproveGet } from '@/shared/api/auth';
import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router';
import { Layout } from './Layout';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="*" element={<Layout />}>
			<Route
				path="auth/oauth-authorized/:method"
				loader={async ({ params, request }) => {
					const { method } = params;
					const url = new URL(request.url);
					url.searchParams.set('method', method ?? '');

					return redirect(`/login?${url.searchParams.toString()}`);
				}}
			/>
			<Route path="" element={<HomePage />} loader={() => redirect('/timetable/groups')} />

			<Route
				path="login"
				element={<LoginPage />}
				loader={() => (localStorage.getItem('login_data') ? redirect('/profile') : null)}
			/>
			<Route
				path="profile"
				element={<ProfilePage />}
				loader={() => (localStorage.getItem('login_data') ? null : redirect('/login'))}
			/>
			<Route path="timetable">
				<Route path="" loader={() => redirect('/timetable/groups')} />

				<Route path="groups">
					<Route path="" element={<TimetableGroupsPage />} />
					<Route path=":groupId" element={<TimetableGroupPage />} />
				</Route>

				<Route path="events">
					<Route path="" element={<TimetableEventsPage />} />
					<Route path=":eventId" element={<TimetableEventPage />} />
				</Route>

				<Route path="rooms">
					<Route path=":roomId" element={<TimetableRoomPage />} />
				</Route>

				<Route path="lecturers">
					<Route path=":lecturerId" element={<TimetableLecturerPage />} />
				</Route>
			</Route>

			<Route path="rating">
				<Route path="" element={<RatingPage />} />
				<Route path="lecturer/:lecturerId" element={<LecturerRatingPage />} />
			</Route>

			<Route path="map">
				<Route path="" loader={() => redirect('/map/5')} />
				<Route path=":floor" element={<MapPage />}>
					<Route path=":roomName" element={<MapPage />} />
				</Route>
			</Route>

			<Route path="printer">
				<Route
					path=""
					element={<PrinterPage />}
					loader={async () => {
						const isAvailable = await checkPrinterAvailable();

						return isAvailable ? null : redirect('/printer/login');
					}}
				/>
				<Route
					path="login"
					element={<PrinterLoginPage />}
					loader={async () => {
						const loginData = localStorage.getItem('login_data');

						if (!loginData) {
							return redirect('/login');
						}

						const isAvailable = await checkPrinterAvailable();

						return isAvailable ? redirect('/printer') : null;
					}}
				/>
			</Route>

			<Route
				path="auth/register/success"
				loader={async ({ request }) => {
					const url = new URL(request.url);
					const token = url.searchParams.get('token');

					if (!token) {
						return redirect('/login?result=error');
					}

					const { error } = await approveEmailEmailApproveGet({ query: { token } });

					if (error) {
						return redirect('/login?result=error');
					}

					return redirect('/login?result=success');
				}}
			/>
		</Route>
	)
);
