// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

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
		this.__super(options);

		options = utils.deepExtend({
			visible: false,
			color: {},
			area: {}
		}, [options]);

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
		 * Post-process image after creating result image base
		 *
		 * @method processImage
		 * @param {PNGImage} image
		 * @return {PNGImage}
		 */
		processImage: function (image) {
			this._blockOut(image);
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
				coord,
				color;

			rect = this.getAreaRect().clone();
			rect.limitCoordinates(new Rect({
				x: 0,
				y: 0,
				width: image.getWidth(),
				height: image.getHeight()
			}));

			coord = rect.getCoordinates();
			color = this.getColor().getColor(true, true);

			image.fillRect(coord.x, coord.y, coord.width, coord.height, color);
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_BLOCK_OUT'
	}
);

module.exports = BlockOut;
