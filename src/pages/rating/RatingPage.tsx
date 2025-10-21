import { Container } from "@/shared/ui";
import { PageHeader } from "@/shared/ui/PageHeader";

import { LecturersTable } from "./ui";

export const RatingPage = () => {
	return (
		<>
			<PageHeader breadcrumbs={[{ href: "/rating", label: "Дубинушка" }]} />
			<Container>
				<LecturersTable />
			</Container>
		</>
	);
};
