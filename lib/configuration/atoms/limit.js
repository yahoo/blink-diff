// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');
var utils = require('preceptor-core').utils;

var constants = require('../../constants');

/**
 * @class Limit
 * @extends Base
 * @module Configuration
 * @submodule Atoms
 *
 * @property {string} _type
 * @property {number} _value
 */
var Limit = Base.extend(

	/**
	 * Limit constructor
	 *
	 * @param {object} options
	 * @param {string} options.type Type of limit
	 * @param {string} options.context Context of the limit
	 * @param {number} options.value Value of limit
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			type: "min",
			context: "width",
			value: 0
		}, [options]);

		this.setType(options.type);
		this.setContext(options.context);
		this.setValue(options.value);
	},

	{
		/**
		 * Gets the type of the limit
		 *
		 * @method getType
		 * @return {string}
		 */
		getType: function () {
			return this._type;
		},

		/**
		 * Sets the type of the limit
		 *
		 * @method setType
		 * @param {string} value
		 */
		setType: function (value) {
			this._type = value;
		},


		/**
		 * Gets the context of the limit
		 *
		 * @method getContext
		 * @return {string}
		 */
		getContext: function () {
			return this._context;
		},

		/**
		 * Sets the context of the limit
		 *
		 * @method setContext
		 * @param {string} value
		 */
		setContext: function (value) {
			this._context = value;
		},


		/**
		 * Gets the value of the limit
		 *
		 * @method getValue
		 * @return {number}
		 */
		getValue: function () {
			return this._value;
		},

		/**
		 * Sets the value of the limit
		 *
		 * @method setValue
		 * @param {number} value
		 */
		setValue: function (value) {
			this._value = value;
		},


		/**
		 * Is percentage threshold?
		 *
		 * @method isPercentage
		 * @return {boolean}
		 */
		isMin: function () {
			return (this.getType() == constants.LIMIT_TYPE_MIN);
		},

		/**
		 * Is pixel threshold?
		 *
		 * @method isPixel
		 * @return {boolean}
		 */
		isMax: function () {
			return (this.getType() == constants.LIMIT_TYPE_MAX);
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_ATOM_LIMIT'
	}
);

module.exports = Limit;
