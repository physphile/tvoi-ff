export const formatNumber = (number: number) => {
	return new Intl.NumberFormat("ru-RU", {
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		signDisplay: "exceptZero",
	}).format(number);
};
