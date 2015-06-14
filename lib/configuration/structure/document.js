// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');

var Size = require('./device/size');

/**
 * @class document
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {string} _title
 * @property {string} _url
 * @property {string} _referrer
 * @property {Size} _size
 */
var Document = Base.extend(

	/**
	 * Document constructor
	 *
	 * @param {object} options
	 * @param {string} options.title
	 * @param {string} options.url
	 * @param {string} options.referrer
	 * @param {object|Size} options.size
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setTitle(options.title);
		this.setUrl(options.url);
		this.setReferrer(options.referrer);
		this.setSize(options.size);
	},

	{
		/**
		 * Gets the title of the document
		 *
		 * @method getTitle
		 * @return {string}
		 */
		getTitle: function () {
			return this._title;
		},

		/**
		 * Sets the title of the document
		 *
		 * @method setTitle
		 * @param {string} value
		 */
		setTitle: function (value) {
			this._title = value;
		},


		/**
		 * Gets the url of the document
		 *
		 * @method getUrl
		 * @return {string}
		 */
		getUrl: function () {
			return this._url;
		},

		/**
		 * Sets the url of the document
		 *
		 * @method setUrl
		 * @param {string} value
		 */
		setUrl: function (value) {
			this._url = value;
		},


		/**
		 * Gets the referrer of the document
		 *
		 * @method getReferrer
		 * @return {string}
		 */
		getReferrer: function () {
			return this._referrer;
		},

		/**
		 * Sets the referrer of the document
		 *
		 * @method setReferrer
		 * @param {string} value
		 */
		setReferrer: function (value) {
			this._referrer = value;
		},


		/**
		 * Gets the size of the document
		 *
		 * @method getSize
		 * @return {Size}
		 */
		getSize: function () {
			return this._size;
		},

		/**
		 * Sets the size of the document
		 *
		 * @method setSize
		 * @param {object|Size} value
		 */
		setSize: function (value) {
			this._size = this._parseObject(value, Size, 'size');
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_DOCUMENT'
	}
);

module.exports = Document;
