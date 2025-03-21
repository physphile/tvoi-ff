// This file is auto-generated by @hey-api/openapi-ts

import { type UseMutationOptions, queryOptions } from '@tanstack/react-query';
import { client as _heyApiClient } from '../client.gen';
import {
	type Options,
	checkUnionMemberIsUnionMemberGet,
	instantPrintQrPost,
	manualUpdateTerminalAdminUpdatePost,
	printFileFilePinGet,
	rebootTerminalAdminRebootPost,
	sendFilePost,
	updateFileOptionsFilePinPatch,
	updateListIsUnionMemberPost,
	uploadFileFilePinPost,
} from '../sdk.gen';
import type {
	CheckUnionMemberIsUnionMemberGetData,
	InstantPrintQrPostData,
	InstantPrintQrPostError,
	ManualUpdateTerminalAdminUpdatePostData,
	ManualUpdateTerminalAdminUpdatePostError,
	PrintFileFilePinGetData,
	RebootTerminalAdminRebootPostData,
	RebootTerminalAdminRebootPostError,
	SendFilePostData,
	SendFilePostError,
	SendFilePostResponse,
	UpdateFileOptionsFilePinPatchData,
	UpdateFileOptionsFilePinPatchError,
	UpdateFileOptionsFilePinPatchResponse,
	UpdateListIsUnionMemberPostData,
	UpdateListIsUnionMemberPostError,
	UploadFileFilePinPostData,
	UploadFileFilePinPostError,
	UploadFileFilePinPostResponse,
} from '../types.gen';

export type QueryKey<TOptions extends Options> = [
	Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
		_id: string;
		_infinite?: boolean;
	},
];

const createQueryKey = <TOptions extends Options>(
	id: string,
	options?: TOptions,
	infinite?: boolean
): [QueryKey<TOptions>[0]] => {
	const params: QueryKey<TOptions>[0] = {
		_id: id,
		baseUrl: (options?.client ?? _heyApiClient).getConfig().baseUrl,
	} as QueryKey<TOptions>[0];
	if (infinite) {
		params._infinite = infinite;
	}
	if (options?.body) {
		params.body = options.body;
	}
	if (options?.headers) {
		params.headers = options.headers;
	}
	if (options?.path) {
		params.path = options.path;
	}
	if (options?.query) {
		params.query = options.query;
	}
	return [params];
};

export const checkUnionMemberIsUnionMemberGetQueryKey = (
	options: Options<CheckUnionMemberIsUnionMemberGetData>
) => createQueryKey('checkUnionMemberIsUnionMemberGet', options);

export const checkUnionMemberIsUnionMemberGetOptions = (
	options: Options<CheckUnionMemberIsUnionMemberGetData>
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await checkUnionMemberIsUnionMemberGet({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: checkUnionMemberIsUnionMemberGetQueryKey(options),
	});
};

export const updateListIsUnionMemberPostQueryKey = (
	options: Options<UpdateListIsUnionMemberPostData>
) => createQueryKey('updateListIsUnionMemberPost', options);

export const updateListIsUnionMemberPostOptions = (
	options: Options<UpdateListIsUnionMemberPostData>
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await updateListIsUnionMemberPost({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: updateListIsUnionMemberPostQueryKey(options),
	});
};

export const updateListIsUnionMemberPostMutation = (
	options?: Partial<Options<UpdateListIsUnionMemberPostData>>
) => {
	const mutationOptions: UseMutationOptions<
		unknown,
		UpdateListIsUnionMemberPostError,
		Options<UpdateListIsUnionMemberPostData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await updateListIsUnionMemberPost({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};

export const sendFilePostQueryKey = (options: Options<SendFilePostData>) =>
	createQueryKey('sendFilePost', options);

export const sendFilePostOptions = (options: Options<SendFilePostData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await sendFilePost({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: sendFilePostQueryKey(options),
	});
};

export const sendFilePostMutation = (options?: Partial<Options<SendFilePostData>>) => {
	const mutationOptions: UseMutationOptions<
		SendFilePostResponse,
		SendFilePostError,
		Options<SendFilePostData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await sendFilePost({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};

export const printFileFilePinGetQueryKey = (options: Options<PrintFileFilePinGetData>) =>
	createQueryKey('printFileFilePinGet', options);

export const printFileFilePinGetOptions = (options: Options<PrintFileFilePinGetData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await printFileFilePinGet({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: printFileFilePinGetQueryKey(options),
	});
};

export const updateFileOptionsFilePinPatchMutation = (
	options?: Partial<Options<UpdateFileOptionsFilePinPatchData>>
) => {
	const mutationOptions: UseMutationOptions<
		UpdateFileOptionsFilePinPatchResponse,
		UpdateFileOptionsFilePinPatchError,
		Options<UpdateFileOptionsFilePinPatchData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await updateFileOptionsFilePinPatch({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};

export const uploadFileFilePinPostQueryKey = (options: Options<UploadFileFilePinPostData>) =>
	createQueryKey('uploadFileFilePinPost', options);

export const uploadFileFilePinPostOptions = (options: Options<UploadFileFilePinPostData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await uploadFileFilePinPost({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: uploadFileFilePinPostQueryKey(options),
	});
};

export const uploadFileFilePinPostMutation = (
	options?: Partial<Options<UploadFileFilePinPostData>>
) => {
	const mutationOptions: UseMutationOptions<
		UploadFileFilePinPostResponse,
		UploadFileFilePinPostError,
		Options<UploadFileFilePinPostData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await uploadFileFilePinPost({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};

export const instantPrintQrPostQueryKey = (options: Options<InstantPrintQrPostData>) =>
	createQueryKey('instantPrintQrPost', options);

export const instantPrintQrPostOptions = (options: Options<InstantPrintQrPostData>) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await instantPrintQrPost({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: instantPrintQrPostQueryKey(options),
	});
};

export const instantPrintQrPostMutation = (options?: Partial<Options<InstantPrintQrPostData>>) => {
	const mutationOptions: UseMutationOptions<
		unknown,
		InstantPrintQrPostError,
		Options<InstantPrintQrPostData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await instantPrintQrPost({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};

export const manualUpdateTerminalAdminUpdatePostQueryKey = (
	options: Options<ManualUpdateTerminalAdminUpdatePostData>
) => createQueryKey('manualUpdateTerminalAdminUpdatePost', options);

export const manualUpdateTerminalAdminUpdatePostOptions = (
	options: Options<ManualUpdateTerminalAdminUpdatePostData>
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await manualUpdateTerminalAdminUpdatePost({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: manualUpdateTerminalAdminUpdatePostQueryKey(options),
	});
};

export const manualUpdateTerminalAdminUpdatePostMutation = (
	options?: Partial<Options<ManualUpdateTerminalAdminUpdatePostData>>
) => {
	const mutationOptions: UseMutationOptions<
		unknown,
		ManualUpdateTerminalAdminUpdatePostError,
		Options<ManualUpdateTerminalAdminUpdatePostData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await manualUpdateTerminalAdminUpdatePost({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};

export const rebootTerminalAdminRebootPostQueryKey = (
	options: Options<RebootTerminalAdminRebootPostData>
) => createQueryKey('rebootTerminalAdminRebootPost', options);

export const rebootTerminalAdminRebootPostOptions = (
	options: Options<RebootTerminalAdminRebootPostData>
) => {
	return queryOptions({
		queryFn: async ({ queryKey, signal }) => {
			const { data } = await rebootTerminalAdminRebootPost({
				...options,
				...queryKey[0],
				signal,
				throwOnError: true,
			});
			return data;
		},
		queryKey: rebootTerminalAdminRebootPostQueryKey(options),
	});
};

export const rebootTerminalAdminRebootPostMutation = (
	options?: Partial<Options<RebootTerminalAdminRebootPostData>>
) => {
	const mutationOptions: UseMutationOptions<
		unknown,
		RebootTerminalAdminRebootPostError,
		Options<RebootTerminalAdminRebootPostData>
	> = {
		mutationFn: async localOptions => {
			const { data } = await rebootTerminalAdminRebootPost({
				...options,
				...localOptions,
				throwOnError: true,
			});
			return data;
		},
	};
	return mutationOptions;
};
