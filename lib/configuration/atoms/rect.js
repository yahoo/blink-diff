// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

/**
 * @class Rect
 * @extends Base
 * @module Configuration
 * @submodule Atoms
 *
 * @property {int} _left
 * @property {int} _top
 * @property {int} _width
 * @property {int} _height
 */
var Rect = Base.extend(

	/**
	 * Rect constructor
	 *
	 * @param {object} options
	 * @param {int} options.left Offset from the left corner
	 * @param {int} options.top Offset from the top corner
	 * @param {int} options.width Width
	 * @param {int} options.height Height
	 * @param {int} [options.x] Offset from the left corner
	 * @param {int} [options.y] Offset from the top corner
	 * @constructor
	 */
	function (options) {
		this.__super();

		this._left = options.left || options.x;
		this._top = options.top || options.y;
		this._width = options.width;
		this._height = options.height;
	},

	{
		/**
		 * Gets the offset from the left corner
		 *
		 * @method getLeft
		 * @return {int}
		 */
		getLeft: function () {
			return this._left;
		},

		/**
		 * Gets the offset from the top corner
		 *
		 * @method getTop
		 * @return {int}
		 */
		getTop: function () {
			return this._top;
		},


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
		 * Gets the height
		 *
		 * @method getHeight
		 * @return {int}
		 */
		getHeight: function () {
			return this._height;
		},


		/**
		 * Gets boundaries as rect structure
		 *
		 * @method getRect
		 * @return {{left: (int), top: (int), width: (int), height: (int)}}
		 */
		getRect: function () {
			return {
				left: this.getLeft(),
				top: this.getTop(),
				width: this.getWidth(),
				height: this.getHeight()
			};
		},

		/**
		 * Gets boundaries as coordinate structure
		 *
		 * @method getCoordinates
		 * @return {{x: (int), y: (int), width: (int), height: (int)}}
		 */
		getCoordinates: function () {
			return {
				x: this.getLeft(),
				y: this.getTop(),
				width: this.getWidth(),
				height: this.getHeight()
			};
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_ATOM_RECT'
	}
);
