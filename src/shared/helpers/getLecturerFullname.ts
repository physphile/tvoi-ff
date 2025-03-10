interface Args {
	first_name: string;
	middle_name: string;
	last_name: string;
}

export const getLecturerFullname = ({ first_name, middle_name, last_name }: Args) => {
	return `${last_name} ${first_name} ${middle_name}`.trim();
};
