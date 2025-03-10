import { getIsUnionMember } from './getIsUnionMember';
import { getPrinterLoginData } from './getPrinterLoginData';

export const checkPrinterAvailable = async () => {
	const printerLoginData = await getPrinterLoginData();

	if (!printerLoginData) {
		return false;
	}

	const { surname, number } = printerLoginData;

	if (!surname || !number) {
		return false;
	}

	const isMember = await getIsUnionMember({ surname, number });

	return isMember;
};
