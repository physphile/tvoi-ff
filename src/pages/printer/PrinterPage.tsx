import type { SendInput } from '@/shared/api/print';
import { PageHeader } from '@/shared/ui';
import { useForm } from 'react-hook-form';

export const PrinterPage = () => {
	const { register, handleSubmit } = useForm<SendInput>({ defaultValues: {} });

	const onSubmit = (data: SendInput) => {
		console.log(data);
	};

	return (
		<>
			<PageHeader breadcrumbs={[{ href: '/printer', label: 'Принтер' }]} />
			<div style={{ margin: 'auto', width: 'clamp(200px, 100%, 600px)' }}>
				<form onSubmit={handleSubmit(onSubmit)}></form>
			</div>
		</>
	);
};
