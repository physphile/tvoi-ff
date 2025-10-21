import { getIsUnionMember } from "./getIsUnionMember";
import { getPrinterLoginData } from "./getPrinterLoginData";

export const checkPrinterAvailable = async () => {
	const printerLoginData = await getPrinterLoginData();

	if (!printerLoginData) {
		return false;
	}

	const { number, surname } = printerLoginData;

	if (!surname || !number) {
		return false;
	}

	const isMember = await getIsUnionMember({ number, surname });

	return isMember;
};
