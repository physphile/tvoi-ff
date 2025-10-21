export const getLabelNumberColor = (number: null | number | undefined) => {
	if (!number) return "unknown";
	if (Math.abs(number) <= 0.01) return "unknown";
	if (number > 0) return "success";
	return "danger";
};
