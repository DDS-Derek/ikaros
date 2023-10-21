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
 * @interface EpisodeCollection
 */
export interface EpisodeCollection {
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	id?: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof EpisodeCollection
	 */
	finish?: boolean;
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	progress?: number;
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	duration?: number;
	/**
	 *
	 * @type {string}
	 * @memberof EpisodeCollection
	 */
	name?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EpisodeCollection
	 */
	description?: string;
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	sequence?: number;
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	user_id?: number;
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	episode_id?: number;
	/**
	 *
	 * @type {number}
	 * @memberof EpisodeCollection
	 */
	subject_id?: number;
	/**
	 *
	 * @type {string}
	 * @memberof EpisodeCollection
	 */
	name_cn?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EpisodeCollection
	 */
	air_time?: string;
	/**
	 *
	 * @type {string}
	 * @memberof EpisodeCollection
	 */
	ep_group?: EpisodeCollectionEpGroupEnum;
}

export const EpisodeCollectionEpGroupEnum = {
	Main: 'MAIN',
	PromotionVideo: 'PROMOTION_VIDEO',
	OpeningSong: 'OPENING_SONG',
	EndingSong: 'ENDING_SONG',
	SpecialPromotion: 'SPECIAL_PROMOTION',
	SmallTheater: 'SMALL_THEATER',
	Live: 'LIVE',
	CommercialMessage: 'COMMERCIAL_MESSAGE',
	MusicDist1: 'MUSIC_DIST1',
	MusicDist2: 'MUSIC_DIST2',
	MusicDist3: 'MUSIC_DIST3',
	MusicDist4: 'MUSIC_DIST4',
	MusicDist5: 'MUSIC_DIST5',
	Other: 'OTHER',
} as const;

export type EpisodeCollectionEpGroupEnum =
	(typeof EpisodeCollectionEpGroupEnum)[keyof typeof EpisodeCollectionEpGroupEnum];
