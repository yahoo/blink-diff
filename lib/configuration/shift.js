// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

var Color = require('./atoms/color');

/**
 * @class Shift
 * @extends Base
 * @module Configuration
 *
 * @property {boolean} _active
 * @property {Color} _color
 * @property {int} _horizontal
 * @property {int} _vertical
 */
var Shift = Base.extend(

	/**
	 * Shift constructor
	 *
	 * @param {object} options
	 * @param {boolean} options.active Shift activated?
	 * @param {int} options.horizontal Max. horizontal shift
	 * @param {int} options.vertical Max. vertical shift
	 * @constructor
	 */
	function (options) {
		this.__super();

		this._active = !!options.active;

		if (options.color) {
			this.setColor(options.color);
		}

		this._horizontal = options.horizontal;
		this._vertical = options.vertical;
	},

	{
		/**
		 * Is shifting activated?
		 *
		 * @method isActive
		 * @return {boolean}
		 */
		isActive: function () {
			return this._active;
		},


		/**
		 * Gets the color
		 *
		 * @method getColor
		 * @return {Color}
		 */
		getColor: function () {
			return this._color;
		},

		/**
		 * Sets the color
		 *
		 * @method setColor
		 * @param {object|Color} value
		 */
		setColor: function (value) {
			this._color = this._parseColor(value);
		},


		/**
		 * Gets the max. horizontal shift
		 *
		 * @method getHorizontal
		 * @return {int}
		 */
		getHorizontal: function () {
			return this._horizontal;
		},

		/**
		 * Gets the max. vertical shift
		 *
		 * @method getVertical
		 * @return {int}
		 */
		getVertical: function () {
			return this._vertical;
		},


		/**
		 * Parses color information
		 *
		 * @method _parseColor
		 * @param {object|Color} value Color or color-description
		 * @returns {Color}
		 * @private
		 */
		_parseColor: function (value) {

			if (typeof value == 'object' && !value instanceof Color) {
				value = new Color(value);
			}

			if (value instanceof Color) {
				return value;
			} else {
				throw new Error('Unknown color descriptor.');
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_SHIFT'
	}
);
