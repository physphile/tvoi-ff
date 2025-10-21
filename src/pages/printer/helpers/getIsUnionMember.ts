import { checkUnionMemberIsUnionMemberGet } from "@/shared/api/print";

import type { PrinterLoginPageForm } from "../PrinterLoginPage";

export const getIsUnionMember = async (query: PrinterLoginPageForm) => {
	const { error } = await checkUnionMemberIsUnionMemberGet({ query });

	return !error;
};
