export const getTextNumberColor = (number: number | undefined | null) => {
	if (!number) return 'secondary';
	if (Math.abs(number) <= 0.01) return 'secondary';
	if (number > 0) return 'positive';
	return 'danger';
};
