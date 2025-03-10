import { ThemeProvider, Toaster, ToasterProvider } from '@gravity-ui/uikit';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import '@gravity-ui/illustrations/styles/styles.scss';
import './index.css';
import { settings } from '@gravity-ui/date-utils';
import { RouterProvider } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';
import { router } from './router';

settings.loadLocale('ru').then(() => {
	settings.setLocale('ru');
});

const root = document.getElementById('root');

const toaster = new Toaster();

const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: (error, query) => {
			toaster.add({
				theme: 'danger',
				name: 'query-error',
				content:
					(query.meta?.errorMessage as string) ??
					('ru' in error ? (error.ru as string) : 'Неизвестная ошибка'),
			});
		},
	}),
});

if (!root) {
	throw new Error('No root element found');
}

const Root = () => {
	const [theme = 'system'] = useLocalStorage('theme', 'system');

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<ToasterProvider toaster={toaster}>
					<RouterProvider router={router} />
				</ToasterProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

createRoot(root).render(<Root />);
