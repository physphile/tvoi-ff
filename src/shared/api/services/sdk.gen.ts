// This file is auto-generated by @hey-api/openapi-ts

import type { Client, Options as ClientOptions, TDataShape } from '@hey-api/client-fetch';
import { client as _heyApiClient } from './client.gen';
import type {
	CreateButtonCategoryCategoryIdButtonPostData,
	CreateButtonCategoryCategoryIdButtonPostError,
	CreateButtonCategoryCategoryIdButtonPostResponse,
	CreateCategoryCategoryPostData,
	CreateCategoryCategoryPostError,
	CreateCategoryCategoryPostResponse,
	GetButtonCategoryCategoryIdButtonButtonIdGetData,
	GetButtonCategoryCategoryIdButtonButtonIdGetError,
	GetButtonCategoryCategoryIdButtonButtonIdGetResponse,
	GetButtonsCategoryCategoryIdButtonGetData,
	GetButtonsCategoryCategoryIdButtonGetError,
	GetButtonsCategoryCategoryIdButtonGetResponse,
	GetCategoriesCategoryGetData,
	GetCategoriesCategoryGetError,
	GetCategoriesCategoryGetResponse,
	GetCategoryCategoryCategoryIdGetData,
	GetCategoryCategoryCategoryIdGetError,
	GetCategoryCategoryCategoryIdGetResponse,
	GetServiceServiceButtonIdGetData,
	GetServiceServiceButtonIdGetError,
	GetServiceServiceButtonIdGetResponse,
	RemoveButtonCategoryCategoryIdButtonButtonIdDeleteData,
	RemoveButtonCategoryCategoryIdButtonButtonIdDeleteError,
	RemoveCategoryCategoryCategoryIdDeleteData,
	RemoveCategoryCategoryCategoryIdDeleteError,
	UpdateButtonCategoryCategoryIdButtonButtonIdPatchData,
	UpdateButtonCategoryCategoryIdButtonButtonIdPatchError,
	UpdateButtonCategoryCategoryIdButtonButtonIdPatchResponse,
	UpdateCategoryCategoryCategoryIdPatchData,
	UpdateCategoryCategoryCategoryIdPatchError,
	UpdateCategoryCategoryCategoryIdPatchResponse,
} from './types.gen';

export type Options<
	TData extends TDataShape = TDataShape,
	ThrowOnError extends boolean = boolean,
> = ClientOptions<TData, ThrowOnError> & {
	/**
	 * You can provide a client instance returned by `createClient()` instead of
	 * individual options. This might be also useful if you want to implement a
	 * custom client.
	 */
	client?: Client;
	/**
	 * You can pass arbitrary values through the `meta` object. This can be
	 * used to access values that aren't defined as part of the SDK function.
	 */
	meta?: Record<string, unknown>;
};

/**
 * Get Buttons
 * Показать все кнопки в категории
 *
 * Необходимые scopes: `-`
 */
export const getButtonsCategoryCategoryIdButtonGet = <ThrowOnError extends boolean = false>(
	options: Options<GetButtonsCategoryCategoryIdButtonGetData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).get<
		GetButtonsCategoryCategoryIdButtonGetResponse,
		GetButtonsCategoryCategoryIdButtonGetError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}/button',
		...options,
	});
};

/**
 * Create Button
 * Создать кнопку
 *
 * Необходимые scopes: `services.button.create`
 */
export const createButtonCategoryCategoryIdButtonPost = <ThrowOnError extends boolean = false>(
	options: Options<CreateButtonCategoryCategoryIdButtonPostData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).post<
		CreateButtonCategoryCategoryIdButtonPostResponse,
		CreateButtonCategoryCategoryIdButtonPostError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}/button',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Remove Button
 * Удалить кнопку
 *
 * Необходимые scopes: `services.button.remove`
 */
export const removeButtonCategoryCategoryIdButtonButtonIdDelete = <
	ThrowOnError extends boolean = false,
>(
	options: Options<RemoveButtonCategoryCategoryIdButtonButtonIdDeleteData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).delete<
		unknown,
		RemoveButtonCategoryCategoryIdButtonButtonIdDeleteError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}/button/{button_id}',
		...options,
	});
};

/**
 * Get Button
 * Показать одну кнопку
 *
 * Необходимые scopes: `-`
 */
export const getButtonCategoryCategoryIdButtonButtonIdGet = <ThrowOnError extends boolean = false>(
	options: Options<GetButtonCategoryCategoryIdButtonButtonIdGetData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).get<
		GetButtonCategoryCategoryIdButtonButtonIdGetResponse,
		GetButtonCategoryCategoryIdButtonButtonIdGetError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}/button/{button_id}',
		...options,
	});
};

/**
 * Update Button
 * Обновить кнопку
 *
 * Необходимые scopes: `services.button.update`
 */
export const updateButtonCategoryCategoryIdButtonButtonIdPatch = <
	ThrowOnError extends boolean = false,
>(
	options: Options<UpdateButtonCategoryCategoryIdButtonButtonIdPatchData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).patch<
		UpdateButtonCategoryCategoryIdButtonButtonIdPatchResponse,
		UpdateButtonCategoryCategoryIdButtonButtonIdPatchError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}/button/{button_id}',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Get Categories
 * Показывает список категорий
 *
 * Необходимые scopes: `-`
 */
export const getCategoriesCategoryGet = <ThrowOnError extends boolean = false>(
	options?: Options<GetCategoriesCategoryGetData, ThrowOnError>
) => {
	return (options?.client ?? _heyApiClient).get<
		GetCategoriesCategoryGetResponse,
		GetCategoriesCategoryGetError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category',
		...options,
	});
};

/**
 * Create Category
 * Создает категорию
 *
 * Необходимые scopes: `services.category.create`
 */
export const createCategoryCategoryPost = <ThrowOnError extends boolean = false>(
	options: Options<CreateCategoryCategoryPostData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).post<
		CreateCategoryCategoryPostResponse,
		CreateCategoryCategoryPostError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Remove Category
 * Удаляет категорию и все кнопки в ней
 *
 * Необходимые scopes: `services.category.delete`
 */
export const removeCategoryCategoryCategoryIdDelete = <ThrowOnError extends boolean = false>(
	options: Options<RemoveCategoryCategoryCategoryIdDeleteData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).delete<
		unknown,
		RemoveCategoryCategoryCategoryIdDeleteError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}',
		...options,
	});
};

/**
 * Get Category
 * Показывает категорию
 *
 * Необходимые scopes: `-`
 */
export const getCategoryCategoryCategoryIdGet = <ThrowOnError extends boolean = false>(
	options: Options<GetCategoryCategoryCategoryIdGetData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).get<
		GetCategoryCategoryCategoryIdGetResponse,
		GetCategoryCategoryCategoryIdGetError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}',
		...options,
	});
};

/**
 * Update Category
 * Обновляет категорию
 *
 * Необходимые scopes: `services.category.update`
 */
export const updateCategoryCategoryCategoryIdPatch = <ThrowOnError extends boolean = false>(
	options: Options<UpdateCategoryCategoryCategoryIdPatchData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).patch<
		UpdateCategoryCategoryCategoryIdPatchResponse,
		UpdateCategoryCategoryCategoryIdPatchError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/category/{category_id}',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Get Service
 * Показать одну кнопку
 *
 * Необходимые scopes: `-`
 *
 * TODO: Переделать ручку, сделав сервис независимым от кнопки
 */
export const getServiceServiceButtonIdGet = <ThrowOnError extends boolean = false>(
	options: Options<GetServiceServiceButtonIdGetData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).get<
		GetServiceServiceButtonIdGetResponse,
		GetServiceServiceButtonIdGetError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/service/{button_id}',
		...options,
	});
};
