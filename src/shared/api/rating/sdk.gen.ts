// This file is auto-generated by @hey-api/openapi-ts

import type { Client, Options as ClientOptions, TDataShape } from '@hey-api/client-fetch';
import { client as _heyApiClient } from './client.gen';
import type {
	CreateCommentCommentPostData,
	CreateCommentCommentPostError,
	CreateCommentCommentPostResponse,
	CreateLecturerLecturerPostData,
	CreateLecturerLecturerPostError,
	CreateLecturerLecturerPostResponse,
	DeleteCommentCommentUuidDeleteData,
	DeleteCommentCommentUuidDeleteError,
	DeleteCommentCommentUuidDeleteResponse,
	DeleteLecturerLecturerIdDeleteData,
	DeleteLecturerLecturerIdDeleteError,
	DeleteLecturerLecturerIdDeleteResponse,
	GetCommentCommentUuidGetData,
	GetCommentCommentUuidGetError,
	GetCommentCommentUuidGetResponse,
	GetCommentsCommentGetData,
	GetCommentsCommentGetError,
	GetCommentsCommentGetResponse,
	GetLecturerLecturerIdGetData,
	GetLecturerLecturerIdGetError,
	GetLecturerLecturerIdGetResponse,
	GetLecturersLecturerGetData,
	GetLecturersLecturerGetError,
	GetLecturersLecturerGetResponse,
	ImportCommentsCommentImportPostData,
	ImportCommentsCommentImportPostError,
	ImportCommentsCommentImportPostResponse,
	ReviewCommentCommentUuidPatchData,
	ReviewCommentCommentUuidPatchError,
	ReviewCommentCommentUuidPatchResponse,
	UpdateLecturerLecturerIdPatchData,
	UpdateLecturerLecturerIdPatchError,
	UpdateLecturerLecturerIdPatchResponse,
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
 * Get Lecturers
 * `limit` - максимальное количество возвращаемых преподавателей
 *
 * `offset` - нижняя граница получения преподавателей, т.е. если по дефолту первым возвращается преподаватель с условным номером N, то при наличии ненулевого offset будет возвращаться преподаватель с номером N + offset
 *
 * `order_by` - возможные значения `"mark_weighted", "mark_kindness", "mark_freebie", "mark_clarity", "mark_general", "last_name"`.
 * Если передано `'last_name'` - возвращается список преподавателей отсортированных по алфавиту по фамилиям
 * Если передано `'mark_...'` - возвращается список преподавателей отсортированных по конкретной оценке
 *
 * `info` - возможные значения `'comments'`, `'mark'`.
 * Если передано `'comments'`, то возвращаются одобренные комментарии к преподавателю.
 * Если передано `'mark'`, то возвращаются общие средние оценки, а также суммарная средняя оценка по всем одобренным комментариям.
 *
 * `subject`
 * Если передано `subject` - возвращает всех преподавателей, для которых переданное значение совпадает с одним из их предметов преподавания.
 * Также возвращает всех преподавателей, у которых есть комментарий с совпадающим с данным subject.
 *
 * `name`
 * Поле для ФИО. Если передано `name` - возвращает всех преподователей, для которых нашлись совпадения с переданной строкой
 *
 * `asc_order`
 * Если передано true, сортировать в порядке возрастания
 * Иначе - в порядке убывания
 */
export const getLecturersLecturerGet = <ThrowOnError extends boolean = false>(
	options?: Options<GetLecturersLecturerGetData, ThrowOnError>
) => {
	return (options?.client ?? _heyApiClient).get<
		GetLecturersLecturerGetResponse,
		GetLecturersLecturerGetError,
		ThrowOnError
	>({
		url: '/lecturer',
		...options,
	});
};

/**
 * Create Lecturer
 * Scopes: `["rating.lecturer.create"]`
 *
 * Создает преподавателя в базе данных RatingAPI
 */
export const createLecturerLecturerPost = <ThrowOnError extends boolean = false>(
	options: Options<CreateLecturerLecturerPostData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).post<
		CreateLecturerLecturerPostResponse,
		CreateLecturerLecturerPostError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/lecturer',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Delete Lecturer
 * Scopes: `["rating.lecturer.delete"]`
 */
export const deleteLecturerLecturerIdDelete = <ThrowOnError extends boolean = false>(
	options: Options<DeleteLecturerLecturerIdDeleteData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).delete<
		DeleteLecturerLecturerIdDeleteResponse,
		DeleteLecturerLecturerIdDeleteError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/lecturer/{id}',
		...options,
	});
};

/**
 * Get Lecturer
 * Scopes: `["rating.lecturer.read"]`
 *
 * Возвращает преподавателя по его ID в базе данных RatingAPI
 *
 * *QUERY* `info: string` - возможные значения `'comments'`, `'mark'`.
 * Если передано `'comments'`, то возвращаются одобренные комментарии к преподавателю.
 * Если передано `'mark'`, то возвращаются общие средние оценки, а также суммарная средняя оценка по всем одобренным комментариям.
 *
 * Subject лектора возвращшается либо из базы данных, либо из любого аппрувнутого комментария
 */
export const getLecturerLecturerIdGet = <ThrowOnError extends boolean = false>(
	options: Options<GetLecturerLecturerIdGetData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).get<
		GetLecturerLecturerIdGetResponse,
		GetLecturerLecturerIdGetError,
		ThrowOnError
	>({
		url: '/lecturer/{id}',
		...options,
	});
};

/**
 * Update Lecturer
 * Scopes: `["rating.lecturer.update"]`
 */
export const updateLecturerLecturerIdPatch = <ThrowOnError extends boolean = false>(
	options: Options<UpdateLecturerLecturerIdPatchData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).patch<
		UpdateLecturerLecturerIdPatchResponse,
		UpdateLecturerLecturerIdPatchError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/lecturer/{id}',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Get Comments
 * Scopes: `["rating.comment.review"]`
 *
 * `limit` - максимальное количество возвращаемых комментариев
 *
 * `offset` -  смещение, определяющее, с какого по порядку комментария начинать выборку.
 * Если без смещения возвращается комментарий с условным номером N,
 * то при значении offset = X будет возвращаться комментарий с номером N + X
 *
 * `order_by` - возможное значение `'create_ts'` - возвращается список комментариев отсортированных по времени создания
 *
 * `lecturer_id` - вернет все комментарии для преподавателя с конкретным id, по дефолту возвращает вообще все аппрувнутые комментарии.
 *
 * `user_id` - вернет все комментарии пользователя с конкретным id
 *
 * `unreviewed` - вернет все непроверенные комментарии, если True. По дефолту False.
 */
export const getCommentsCommentGet = <ThrowOnError extends boolean = false>(
	options?: Options<GetCommentsCommentGetData, ThrowOnError>
) => {
	return (options?.client ?? _heyApiClient).get<
		GetCommentsCommentGetResponse,
		GetCommentsCommentGetError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/comment',
		...options,
	});
};

/**
 * Create Comment
 * Scopes: `["rating.comment.import"]`
 * Создает комментарий к преподавателю в базе данных RatingAPI
 * Для создания комментария нужно быть авторизованным
 *
 * Для возможности создания комментария с указанием времени создания и изменения необходим скоуп ["rating.comment.import"]
 */
export const createCommentCommentPost = <ThrowOnError extends boolean = false>(
	options: Options<CreateCommentCommentPostData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).post<
		CreateCommentCommentPostResponse,
		CreateCommentCommentPostError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/comment',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Import Comments
 * Scopes: `["rating.comment.import"]`
 * Создает комментарии в базе данных RatingAPI
 */
export const importCommentsCommentImportPost = <ThrowOnError extends boolean = false>(
	options: Options<ImportCommentsCommentImportPostData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).post<
		ImportCommentsCommentImportPostResponse,
		ImportCommentsCommentImportPostError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/comment/import',
		...options,
		headers: {
			'Content-Type': 'application/json',
			...options?.headers,
		},
	});
};

/**
 * Delete Comment
 * Scopes: `["rating.comment.delete"]`
 *
 * Удаляет комментарий по его UUID в базе данных RatingAPI
 */
export const deleteCommentCommentUuidDelete = <ThrowOnError extends boolean = false>(
	options: Options<DeleteCommentCommentUuidDeleteData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).delete<
		DeleteCommentCommentUuidDeleteResponse,
		DeleteCommentCommentUuidDeleteError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/comment/{uuid}',
		...options,
	});
};

/**
 * Get Comment
 * Возвращает комментарий по его UUID в базе данных RatingAPI
 */
export const getCommentCommentUuidGet = <ThrowOnError extends boolean = false>(
	options: Options<GetCommentCommentUuidGetData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).get<
		GetCommentCommentUuidGetResponse,
		GetCommentCommentUuidGetError,
		ThrowOnError
	>({
		url: '/comment/{uuid}',
		...options,
	});
};

/**
 * Review Comment
 * Scopes: `["rating.comment.review"]`
 * Проверка комментария и присваивания ему статуса по его UUID в базе данных RatingAPI
 *
 * `review_status` - возможные значения
 * `approved` - комментарий одобрен и возвращается при запросе лектора
 * `dismissed` - комментарий отклонен, не отображается в запросе лектора
 */
export const reviewCommentCommentUuidPatch = <ThrowOnError extends boolean = false>(
	options: Options<ReviewCommentCommentUuidPatchData, ThrowOnError>
) => {
	return (options.client ?? _heyApiClient).patch<
		ReviewCommentCommentUuidPatchResponse,
		ReviewCommentCommentUuidPatchError,
		ThrowOnError
	>({
		security: [
			{
				name: 'Authorization',
				type: 'apiKey',
			},
		],
		url: '/comment/{uuid}',
		...options,
	});
};
