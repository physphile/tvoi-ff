import { useForm } from "react-hook-form";

import type { SendInput } from "@/shared/api/print";

import { PageHeader } from "@/shared/ui";

export const PrinterPage = () => {
	const { handleSubmit } = useForm<SendInput>({ defaultValues: {} });

	const onSubmit = (data: SendInput) => {
		console.log(data);
	};

	return (
		<>
			<PageHeader breadcrumbs={[{ href: "/printer", label: "Принтер" }]} />
			<div style={{ margin: "auto", width: "clamp(200px, 100%, 600px)" }}>
				<form onSubmit={handleSubmit(onSubmit)} />
			</div>
		</>
	);
};
