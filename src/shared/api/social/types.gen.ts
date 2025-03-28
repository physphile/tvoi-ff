// This file is auto-generated by @hey-api/openapi-ts

export type GroupGet = {
	id: number;
	owner_id?: number | null;
	name?: string | null;
	type?: string | null;
	description?: string | null;
	invite_link?: string | null;
};

export type GroupGetMany = {
	items: Array<GroupGet>;
};

export type GroupPatch = {
	update_from_source?: boolean | null;
	name?: string | null;
	description?: string | null;
	invite_link?: string | null;
};

export type GroupRequestGet = {
	secret_key: string;
	valid_ts: string;
};

export type HttpValidationError = {
	detail?: Array<ValidationError>;
};

export type ValidationError = {
	loc: Array<string | number>;
	msg: string;
	type: string;
};

export type VkGroupCreate = {
	confirmation_token: string;
	change_secret_key?: boolean;
};

export type VkGroupCreateResponse = {
	group_id: number;
	secret_key: string;
};

export type GetAllGroupsGroupGetData = {
	body?: never;
	path?: never;
	query?: {
		my?: boolean;
	};
	url: '/group';
};

export type GetAllGroupsGroupGetErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type GetAllGroupsGroupGetError =
	GetAllGroupsGroupGetErrors[keyof GetAllGroupsGroupGetErrors];

export type GetAllGroupsGroupGetResponses = {
	/**
	 * Successful Response
	 */
	200: GroupGetMany;
};

export type GetAllGroupsGroupGetResponse =
	GetAllGroupsGroupGetResponses[keyof GetAllGroupsGroupGetResponses];

export type CreateGroupRequestGroupPostData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/group';
};

export type CreateGroupRequestGroupPostResponses = {
	/**
	 * Successful Response
	 */
	200: GroupRequestGet;
};

export type CreateGroupRequestGroupPostResponse =
	CreateGroupRequestGroupPostResponses[keyof CreateGroupRequestGroupPostResponses];

export type ValidateGroupRequestGroupValidationGetData = {
	body?: never;
	path?: never;
	query: {
		secret_key: string;
	};
	url: '/group/validation';
};

export type ValidateGroupRequestGroupValidationGetErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type ValidateGroupRequestGroupValidationGetError =
	ValidateGroupRequestGroupValidationGetErrors[keyof ValidateGroupRequestGroupValidationGetErrors];

export type ValidateGroupRequestGroupValidationGetResponses = {
	/**
	 * Successful Response
	 */
	200: GroupGet | GroupRequestGet;
};

export type ValidateGroupRequestGroupValidationGetResponse =
	ValidateGroupRequestGroupValidationGetResponses[keyof ValidateGroupRequestGroupValidationGetResponses];

export type UpdateGroupInfoGroupGroupIdPatchData = {
	body: GroupPatch;
	path: {
		group_id: number;
	};
	query?: never;
	url: '/group/{group_id}';
};

export type UpdateGroupInfoGroupGroupIdPatchErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type UpdateGroupInfoGroupGroupIdPatchError =
	UpdateGroupInfoGroupGroupIdPatchErrors[keyof UpdateGroupInfoGroupGroupIdPatchErrors];

export type UpdateGroupInfoGroupGroupIdPatchResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type GithubWebhookGithubPostData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/github';
};

export type GithubWebhookGithubPostResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type TelegramWebhookTelegramPostData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/telegram';
};

export type TelegramWebhookTelegramPostResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type VkWebhookVkPostData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/vk';
};

export type VkWebhookVkPostResponses = {
	/**
	 * Successful Response
	 */
	200: string;
};

export type VkWebhookVkPostResponse = VkWebhookVkPostResponses[keyof VkWebhookVkPostResponses];

export type CreateOrReplaceGroupVkGroupIdPutData = {
	body: VkGroupCreate;
	path: {
		group_id: number;
	};
	query?: never;
	url: '/vk/{group_id}';
};

export type CreateOrReplaceGroupVkGroupIdPutErrors = {
	/**
	 * Validation Error
	 */
	422: HttpValidationError;
};

export type CreateOrReplaceGroupVkGroupIdPutError =
	CreateOrReplaceGroupVkGroupIdPutErrors[keyof CreateOrReplaceGroupVkGroupIdPutErrors];

export type CreateOrReplaceGroupVkGroupIdPutResponses = {
	/**
	 * Successful Response
	 */
	200: VkGroupCreateResponse;
};

export type CreateOrReplaceGroupVkGroupIdPutResponse =
	CreateOrReplaceGroupVkGroupIdPutResponses[keyof CreateOrReplaceGroupVkGroupIdPutResponses];

export type DiscordWebhookDiscordPostData = {
	body?: never;
	path?: never;
	query?: never;
	url: '/discord';
};

export type DiscordWebhookDiscordPostResponses = {
	/**
	 * Successful Response
	 */
	200: unknown;
};

export type ClientOptions = {
	baseUrl: `${string}://${string}/social` | (string & {});
};
