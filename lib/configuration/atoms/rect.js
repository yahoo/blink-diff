// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');

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

		this.setLeft(options.left || options.x);
		this.setTop(options.top || options.y);
		this.setWidth(options.width);
		this.setHeight(options.height);
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
		 * Sets the offset from the left corner
		 *
		 * @method setLeft
		 * @param {int} value
		 */
		setLeft: function (value) {
			this._left = value;
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
		 * Sets the offset from the top corner
		 *
		 * @method setTop
		 * @param {int} value
		 */
		setTop: function (value) {
			this._top = value;
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
		},

		/**
		 * Checks if a coordinate is within the bounds of the rect
		 *
		 * @method inBounds
		 * @param {int} x X-coordinate
		 * @param {int} y Y-coordinate
		 */
		inBounds: function (x, y) {
			if ((x < this.getLeft()) || (x > this.getLeft() + this.getWidth())) {
				return false;
			}
			if ((y < this.getTop()) || (y > this.getTop() + this.getHeight())) {
				return false;
			}
			return true;
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

module.exports = Rect;
