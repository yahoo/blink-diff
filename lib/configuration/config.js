// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

var Comparison = require('./comparison');
var Image = require('./image');

/**
 * @class Config
 * @extends Base
 * @module Configuration
 *
 * @property {boolean} debug
 * @property {boolean} verbose
 * @property {Image} _imageA
 * @property {Image} _imageB
 * @property {Comparison[]} _comparisons
 */
var Config = Base.extend(

	/**
	 * Config constructor
	 *
	 * @param {object} options
	 * @constructor
	 */
	function (options) {
		this.__super();

		if (options.debug !== undefined) {
			this.setDebugMode(options.debug);
		}
		if (options.verbose !== undefined) {
			this.setVerboseMode(options.verbose);
		}

		this.setImageA(options.imageA);
		this.setImageB(options.imageB);

		this.setComparisons(options.comparisons);
	},

	{
		/**
		 * Is in debug-mode?
		 *
		 * @method isDebugMode
		 * @return {boolean}
		 */
		isDebugMode: function () {
			return this._debug;
		},

		/**
		 * Sets the debug-mode
		 *
		 * @method setDebugMode
		 * @param {boolean} value
		 */
		setDebugMode: function (value) {
			this._debug = !!value;
		},


		/**
		 * Is in verbose-mode?
		 *
		 * @method isVerboseMode
		 * @return {boolean}
		 */
		isVerboseMode: function () {
			return this._verbose;
		},

		/**
		 * Sets the verbose-mode
		 *
		 * @method setVerboseMode
		 * @param {boolean} value
		 */
		setVerboseMode: function (value) {
			this._verbose = !!value;
		},


		/**
		 * Gets the first image
		 *
		 * @method getImageA
		 * @return {Image}
		 */
		getImageA: function () {
			return this._imageA;
		},

		/**
		 * Sets the first image
		 *
		 * @method setImageA
		 * @param {object|Image} value
		 */
		setImageA: function (value) {
			this._imageA = this._parseImage(value);
		},


		/**
		 * Gets the second image
		 *
		 * @method getImageB
		 * @return {Image}
		 */
		getImageB: function () {
			return this._imageB;
		},

		/**
		 * Sets the second image
		 *
		 * @method setImageB
		 * @param {object|Image} value
		 */
		setImageB: function (value) {
			this._imageB = this._parseImage(value);
		},


		/**
		 * Gets the comparisons
		 *
		 * @method getComparisons
		 * @return {Comparison[]}
		 */
		getComparisons: function () {
			return this._comparisons;
		},

		/**
		 * Sets the comparisons
		 *
		 * @method setComparisons
		 * @param {object[]|Comparison[]} value
		 */
		setComparisons: function (value) {

			var list = [];

			value.forEach(function (comparison) {
				list.push(this._parseComparison(comparison));
			}.bind(this));

			this._comparisons = list;
		},


		/**
		 * Parses image information
		 *
		 * @method _parseImage
		 * @param {object|Image} value Image or image-description
		 * @returns {Image}
		 * @private
		 */
		_parseImage: function (value) {

			if (typeof value == 'object' && !value instanceof Image) {
				value = new Image(value);
			}

			if (value instanceof Image) {
				return value;
			} else {
				throw new Error('Unknown image descriptor.');
			}
		},

		/**
		 * Parses comparison information
		 *
		 * @method _parseComparison
		 * @param {object|Comparison} value Comparison or comparison-description
		 * @returns {Comparison}
		 * @private
		 */
		_parseComparison: function (value) {

			if (typeof value == 'object' && !value instanceof Comparison) {
				value = new Comparison(value);
			}

			if (value instanceof Comparison) {
				return value;
			} else {
				throw new Error('Unknown comparison descriptor.');
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_CONFIG'
	}
);
