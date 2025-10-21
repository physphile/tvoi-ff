interface Args {
	first_name: string;
	last_name: string;
	middle_name: string;
}

export const getLecturerFullname = ({ first_name, last_name, middle_name }: Args) => {
	return `${last_name} ${first_name} ${middle_name}`.trim();
};
