// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');

var Color = require('./atoms/color');
var Rect = require('./atoms/rect');

/**
 * @class BlockOut
 * @extends Base
 * @module Configuration
 *
 * @property {boolean} _visible
 * @property {Color} _color
 * @property {Rect} _area
 */
var BlockOut = Base.extend(

	/**
	 * BlockOut constructor
	 *
	 * @param {object} options
	 * @param {boolean} options.visible
	 * @param {object|Color} options.color
	 * @param {object|Rect} options.area
	 * @constructor
	 */
	function (options) {
		this.__super();

		this.setVisibility(options.visible);
		this.setColor(options.color);
		this.setAreaRect(options.area);
	},

	{
		/**
		 * Is block-out visible in final result
		 *
		 * @method isVisible
		 * @return {boolean}
		 */
		isVisible: function () {
			return this._visible;
		},

		/**
		 * Sets the visibility of the block-out in final result
		 *
		 * @method setVisibility
		 * @param {boolean} value
		 */
		setVisibility: function (value) {
			this._visible = !!value;
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
			this._color = this._parseObject(value, Color, 'color');
		},


		/**
		 * Gets the area rectangle
		 *
		 * @method getAreaRect
		 * @return {Rect}
		 */
		getAreaRect: function () {
			return this._area;
		},

		/**
		 * Sets the area rectangle
		 *
		 * @method setAreaRect
		 * @param {object|Rect} value
		 */
		setAreaRect: function (value) {
			this._area = this._parseObject(value, Rect, 'rect');
		},


		/**
		 * Pre-process image before creating result image base
		 *
		 * @method preProcessImage
		 * @param {PNGImage} image
		 * @return {PNGImage}
		 */
		preProcessImage: function (image) {

			if (this.isVisible()) {
				this._blockOut(image);
			}

			return image;
		},

		/**
		 * Post-process image after creating result image base
		 *
		 * @method postProcessImage
		 * @param {PNGImage} image
		 * @return {PNGImage}
		 */
		postProcessImage: function (image) {

			if (!this.isVisible()) {
				this._blockOut(image);
			}

			return image;
		},

		/**
		 * Blocks-out an area of the image
		 *
		 * @method _blockOut
		 * @param {PNGImage} image
		 * @private
		 */
		_blockOut: function (image) {

			var rect,
				color;

			rect = this.getAreaRect().getCoordinates();
			color = this.getColor().getColor(true, true);

			this._correctCoordinates(image.getWidth(), image.getHeight(), rect);
			image.fillRect(rect.x, rect.y, rect.width, rect.height, color);
		},

		/**
		 * Correcting area coordinates if necessary
		 *
		 * Note:
		 *  Priority is on the x/y coordinates, and not on the size since the size will then be removed anyways.
		 *
		 * @method _correctDimensions
		 * @param {int} width Image width
		 * @param {int} height Image height
		 * @param {object} rect Values for rect
		 * @param {int} rect.x X value of rect
		 * @param {int} rect.y Y value of rect
		 * @param {int} rect.width Width value of rect
		 * @param {int} rect.height Height value of rect
		 * @private
		 */
		_correctCoordinates: function (width, height, rect) {

			// Set values if none given
			rect.x = rect.x || 0;
			rect.y = rect.y || 0;
			rect.width = rect.width || width;
			rect.height = rect.height || height;

			// Check negative values
			rect.x = Math.max(0, rect.x);
			rect.y = Math.max(0, rect.y);
			rect.width = Math.max(0, rect.width);
			rect.height = Math.max(0, rect.height);

			// Check dimensions
			rect.x = Math.min(rect.x, width - 1); // -1 to make sure that there is an image
			rect.y = Math.min(rect.y, height - 1);
			rect.width = Math.min(rect.width, width - rect.x);
			rect.height = Math.min(rect.height, height - rect.y);
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_BLOCKOUT'
	}
);
