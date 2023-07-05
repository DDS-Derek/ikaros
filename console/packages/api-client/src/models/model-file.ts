/* tslint:disable */
/* eslint-disable */
/**
 * Ikaros Open API Documentation
 * Documentation for Ikaros Open API
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface ModelFile
 */
export interface ModelFile {
	/**
	 *
	 * @type {number}
	 * @memberof ModelFile
	 */
	id?: number;
	/**
	 *
	 * @type {number}
	 * @memberof ModelFile
	 */
	folderId?: number;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	url?: string;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	md5?: string;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	aesKey?: string;
	/**
	 *
	 * @type {number}
	 * @memberof ModelFile
	 */
	size?: number;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	type?: ModelFileTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	fsPath?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof ModelFile
	 */
	canRead?: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof ModelFile
	 */
	updateTime?: string;
}

export const ModelFileTypeEnum = {
	Image: 'IMAGE',
	Video: 'VIDEO',
	Document: 'DOCUMENT',
	Voice: 'VOICE',
	Unknown: 'UNKNOWN',
} as const;

export type ModelFileTypeEnum =
	(typeof ModelFileTypeEnum)[keyof typeof ModelFileTypeEnum];
