// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

var Threshold = require('./atoms/threshold');

var constants = require('../constants');

/**
 * @class Anchor
 * @extends Base
 * @module Configuration
 *
 * @property {string} _type
 * @property {string} _position
 * @property {Threshold} _threshold
 */
var Anchor = Base.extend(

	/**
	 * Anchor constructor
	 *
	 * @param {object} options
	 * @param {string} options.type
	 * @param {string} options.position
	 * @param {object|Threshold} options.threshold
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			type: constants.ANCHOR_TYPE_WIDTH,
			position: constants.ANCHOR_POSITION_RELATIVE,
			threshold: {}
		}, [options]);

		this.setType(options.type);
		this.setPositioning(options.position);
		this.setThreshold(options.threshold);
	},

	{
		/**
		 * Gets the type of the anchor
		 *
		 * @method getType
		 * @return {string}
		 */
		getType: function () {
			return this._type;
		},

		/**
		 * Sets the type of the anchor
		 *
		 * @method setType
		 * @param {string} value
		 */
		setType: function (value) {
			this._type = value;
		},


		/**
		 * Gets the positioning of the anchor
		 *
		 * @method getPositioning
		 * @return {string}
		 */
		getPositioning: function () {
			return this._position;
		},

		/**
		 * Sets the positioning of the anchor
		 *
		 * @method setPositioning
		 * @param {string} value
		 */
		setPositioning: function (value) {
			this._position = value;
		},


		/**
		 * Gets the threshold
		 *
		 * @method getThreshold
		 * @return {Threshold}
		 */
		getThreshold: function () {
			return this._threshold;
		},

		/**
		 * Sets the threshold
		 *
		 * @method setThreshold
		 * @param {object|Threshold} value
		 */
		setThreshold: function (value) {
			this._threshold = this._parseObject(value, Threshold, "threshold");
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_ANCHOR'
	}
);

module.exports = Anchor;
