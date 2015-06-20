// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');
var utils = require('preceptor-core').utils;

var constants = require('../../constants');

/**
 * @class Threshold
 * @extends Base
 * @module Configuration
 * @submodule Atoms
 *
 * @property {string} _type
 * @property {number} _value
 */
var Threshold = Base.extend(

	/**
	 * Threshold constructor
	 *
	 * @param {object} options
	 * @param {string} options.type Type of threshold
	 * @param {number} options.value Value of threshold
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			type: 'pixel',
			value: 1
		}, [options]);

		this.setType(options.type);
		this.setValue(options.value);
	},

	{
		/**
		 * Gets the type of the threshold
		 *
		 * @method getType
		 * @return {string}
		 */
		getType: function () {
			return this._type;
		},

		/**
		 * Sets the type of the threshold
		 *
		 * @method setType
		 * @param {string} value
		 */
		setType: function (value) {
			this._type = value;
		},


		/**
		 * Gets the value of the threshold
		 *
		 * @method getValue
		 * @return {number}
		 */
		getValue: function () {
			return this._value;
		},

		/**
		 * Sets the value of the threshold
		 *
		 * @method setValue
		 * @param {number} value
		 */
		setValue: function (value) {
			this._value = value;
		},


		/**
		 * Is the difference above the set threshold?
		 *
		 * @method isAboveThreshold
		 * @param {int} items
		 * @param {int} [total]
		 * @return {boolean}
		 */
		isAboveThreshold: function (items, total) {

			if (this.isPixel() && (this.getValue() <= items)) {
				return true;

			} else if (this.getValue() <= (items / total)) {
				return true;
			}

			return false;
		},


		/**
		 * Is percentage threshold?
		 *
		 * @method isPercentage
		 * @return {boolean}
		 */
		isPercentage: function () {
			return (this.getType() == constants.THRESHOLD_PERCENT);
		},

		/**
		 * Is pixel threshold?
		 *
		 * @method isPixel
		 * @return {boolean}
		 */
		isPixel: function () {
			return (this.getType() == constants.THRESHOLD_PIXEL);
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_ATOM_THRESHOLD'
	}
);

module.exports = Threshold;
