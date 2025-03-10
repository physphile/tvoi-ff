export const formatNumber = (number: number) => {
	return new Intl.NumberFormat('ru-RU', {
		signDisplay: 'exceptZero',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(number);
};
