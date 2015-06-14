// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../../base');

/**
 * @class Size
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {int} _width
 * @property {int} _height
 */
var Size = Base.extend(

	/**
	 * Size constructor
	 *
	 * @param {object} options
	 * @param {int} options.width
	 * @param {int} options.height
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setWidth(options.width);
		this.setHeight(options.height);
	},

	{
		/**
		 * Gets the width
		 *
		 * @method getWidth
		 * @return {int}
		 */
		getWidth: function () {
			return this._width;
		},

		/**
		 * Sets the width
		 *
		 * @method setWidth
		 * @param {int} value
		 */
		setWidth: function (value) {
			this._width = value;
		},


		/**
		 * Gets the height
		 *
		 * @method getHeight
		 * @return {int}
		 */
		getHeight: function () {
			return this._height;
		},

		/**
		 * Sets the height
		 *
		 * @method setHeight
		 * @param {int} value
		 */
		setHeight: function (value) {
			this._height = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_DEVICE_SIZE'
	}
);

module.exports = Size;
