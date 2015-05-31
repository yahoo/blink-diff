// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

var constants = require('../../constants');

/**
 * @class Threshold
 * @extends Base
 * @module Configuration
 * @submodule Atoms
 *
 * @property {string} _type
 * @property {number} _value
 * @property {number} _delta
 */
var Threshold = Base.extend(

	/**
	 * Threshold constructor
	 *
	 * @param {object} options
	 * @param {string} options.type Type of threshold
	 * @param {number} options.value Value of threshold
	 * @param {number} options.delta Max. delta of colors before triggering difference
	 * @constructor
	 */
	function (options) {
		this.__super();

		this._type = options.type;
		this._value = options.value;
		this._delta = options.delta;
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
		 * Gets the value of the threshold
		 *
		 * @method getValue
		 * @return {number}
		 */
		getValue: function () {
			return this._value;
		},

		/**
		 * Gets the max. delta for color differences before triggering it
		 *
		 * @method getDelta
		 * @return {number}
		 */
		getDelta: function () {
			return this._delta;
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
