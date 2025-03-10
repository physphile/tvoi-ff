import { useLocalStorage } from 'usehooks-ts';

interface PrinterData {
	surname: string;
	number: string;
}

export const usePrinterData = () => {
	const [printerData, setPrinterData, removePrinterData] = useLocalStorage<PrinterData>(
		'printer_data',
		{} as PrinterData
	);

	return { ...printerData, setPrinterData, removePrinterData };
};
