// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');

var Color = require('./atoms/color');
var Rect = require('./atoms/rect');
var Shift = require('./shift');
var BlockOut = require('./blockOut');

/**
 * @class PixelComparison
 * @extends Base
 * @module Configuration
 *
 * @property {string} _type
 * @property {number} _colorDelta
 * @property {Color} _gamma
 * @property {boolean} _perceptual
 * @property {string[]} _filters
 * @property {Shift} _shift
 * @property {BlockOut[]} _blockOuts
 * @property {Color} _color
 * @property {Rect} _areaImageA
 * @property {Rect} _areaImageB
 */
var PixelComparison = Base.extend(

	/**
	 * Pixel-comparison constructor
	 *
	 * @param {object} options
	 * @param {string} options.type Type of comparison
	 * @param {number} options.colorDelta Max. delta of colors before triggering difference
	 * @param {object|Color} options.gamma Gamma correction for perceptual comparisons
	 * @param {boolean} options.perceptual Active/deactivate perceptual comparison
	 * @param {string[]} options.filters Comparison filters (i.e. "blur" to reduce sub-pixel issues)
	 * @param {object|Shift} options.shift Pixel shifting
	 * @param {object[]|BlockOut[]} options.blockOuts List of areas to block-out
	 * @param {object|Color} options.color Color to highlight differences
	 * @param {object|Rect} options.areaImageA Area of comparison in Image A
	 * @param {object|Rect} options.areaImageB Area of comparison in Image B
	 * @constructor
	 */
	function (options) {
		this.__super();

		this.setType(options.type);
		this.setColorDelta(options.colorDelta);

		this.setGamma(options.gamma);
		this.setPerceptual(options.perceptual);
		this.setFilters(options.filters);

		this.setShift(options.shift);

		this.setBlockOuts(options.blockOuts);

		this.setColor(options.color);

		this.setAreaImageA(options.areaImageA);
		this.setAreaImageB(options.areaImageB);
	},

	{
		/**
		 * Gets the comparison type
		 *
		 * @method getType
		 * @return {string}
		 */
		getType: function () {
			return this._type;
		},

		/**
		 * Sets the comparison type
		 *
		 * @method setType
		 * @param {string} value
		 */
		setType: function (value) {
			this._type = value;
		},


		/**
		 * Gets the max. delta for color differences before triggering it
		 *
		 * @method getColorDelta
		 * @return {number}
		 */
		getColorDelta: function () {
			return this._colorDelta;
		},

		/**
		 * Sets the max. delta for color differences before triggering it
		 *
		 * @method setColorDelta
		 * @param {number} value
		 */
		setColorDelta: function (value) {
			this._colorDelta = value;
		},


		/**
		 * Gets the gamma
		 *
		 * @method getGamma
		 * @return {Color}
		 */
		getGamma: function () {
			return this._gamma;
		},

		/**
		 * Sets the gamma
		 *
		 * @method setGamma
		 * @param {object|Color} value
		 */
		setGamma: function (value) {
			this._gamma = this._parseColor(value);
		},


		/**
		 * Is the comparison perceptual?
		 *
		 * @method isPerceptual
		 * @return {boolean}
		 */
		isPerceptual: function () {
			return this._perceptual;
		},

		/**
		 * Sets if the comparison is perceptual
		 *
		 * @method setPerceptual
		 * @param {boolean} value
		 */
		setPerceptual: function (value) {
			this._perceptual = !!value;
		},


		/**
		 * Gets all filters that will be applied to the images before comparison
		 *
		 * @method getFilters
		 * @return {string[]}
		 */
		getFilters: function () {
			return this._filters;
		},

		/**
		 * Sets all filters that should be applied to the images before comparison
		 *
		 * @method setFilters
		 * @param {string[]} value
		 */
		setFilters: function (value) {
			this._filters = value;
		},


		/**
		 * Gets the shift
		 *
		 * @method getShift
		 * @return {Shift}
		 */
		getShift: function () {
			return this._shift;
		},

		/**
		 * Sets the shift
		 *
		 * @method setShift
		 * @param {object|Shift} value
		 */
		setShift: function (value) {
			this._shift = this._parseShift(value);
		},


		/**
		 * Gets the block-outs
		 *
		 * @method getBlockOuts
		 * @return {BlockOut[]}
		 */
		getBlockOuts: function () {
			return this._blockOuts;
		},

		/**
		 * Sets the block-outs
		 *
		 * @method setBlockOuts
		 * @param {object[]|BlockOut[]} value
		 */
		setBlockOuts: function (value) {

			var list = [];

			value.forEach(function (blockOut) {
				list.push(this._parseBlockOut(blockOut));
			}.bind(this));

			this._blockOuts = list;
		},


		/**
		 * Gets the diff-color
		 *
		 * @method getColor
		 * @return {Color}
		 */
		getColor: function () {
			return this._color;
		},

		/**
		 * Sets the diff-color
		 *
		 * @method setColor
		 * @param {object|Color} value
		 */
		setColor: function (value) {
			this._color = this._parseColor(value);
		},


		/**
		 * Gets the area rectangle for image A
		 *
		 * @method getAreaImageA
		 * @return {Rect}
		 */
		getAreaImageA: function () {
			return this._areaImageA;
		},

		/**
		 * Sets the area rectangle for image A
		 *
		 * @method setAreaImageA
		 * @param {object|Rect} value
		 */
		setAreaImageA: function (value) {
			this._areaImageA = this._parseRect(value);
		},


		/**
		 * Gets the area rectangle for image B
		 *
		 * @method getAreaImageB
		 * @return {Rect}
		 */
		getAreaImageB: function () {
			return this._areaImageB;
		},

		/**
		 * Sets the area rectangle for image B
		 *
		 * @method setAreaImageB
		 * @param {object|Rect} value
		 */
		setAreaImageB: function (value) {
			this._areaImageB = this._parseRect(value);
		},


		/**
		 * Parses block-out information
		 *
		 * @method _parseBlockOut
		 * @param {object|BlockOut} value BlockOut or block-out-description
		 * @returns {BlockOut}
		 * @private
		 */
		_parseBlockOut: function (value) {
			return this._parseObject(value, BlockOut, 'block-out');
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
			return this._parseObject(value, Color, 'color');
		},

		/**
		 * Parses shift information
		 *
		 * @method _parseShift
		 * @param {object|Shift} value Shift or shift-description
		 * @returns {Shift}
		 * @private
		 */
		_parseShift: function (value) {
			return this._parseObject(value, Shift, 'shift');
		},

		/**
		 * Parses rect information
		 *
		 * @method _parseRect
		 * @param {object|Rect} value Rect or rect-description
		 * @returns {Rect}
		 * @private
		 */
		_parseRect: function (value) {
			return this._parseObject(value, Rect, 'rect');
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_PIXEL_COMPARISON'
	}
);
