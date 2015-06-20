// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

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
 * @property {number} _colorDeltaSquared
 * @property {Color} _gamma
 * @property {boolean} _perceptual
 * @property {string[]} _filters
 * @property {Shift} _shift
 * @property {BlockOut[]} _blockOuts
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
	 * @param {object|Rect} [options.areaImageA] Area of comparison in Image A
	 * @param {object|Rect} [options.areaImageB] Area of comparison in Image B
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			type: "pixel",
			colorDelta: 20,
			gamma: null,
			perceptual: false,
			filters: [],
			shift: {},
			blockOuts: []
		}, [options]);

		this.setType(options.type);
		this.setColorDelta(options.colorDelta);

		if (options.gamma) {
			this.setGamma(options.gamma);
		}
		this.setPerceptual(options.perceptual);
		this.setFilters(options.filters);

		this.setShift(options.shift);

		this.setBlockOuts(options.blockOuts);

		if (options.areaImageA) {
			this.setAreaImageA(options.areaImageA);
		}
		if (options.areaImageB) {
			this.setAreaImageB(options.areaImageB);
		}
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
		 * Gets the max. delta for color differences before triggering it
		 * This value is squared to reduce Math.sqrt during comparison.
		 *
		 * @method getColorDeltaSquared
		 * @return {number}
		 */
		getColorDeltaSquared: function () {
			return this._colorDeltaSquared;
		},

		/**
		 * Sets the max. delta for color differences before triggering it
		 *
		 * @method setColorDelta
		 * @param {number} value
		 */
		setColorDelta: function (value) {
			this._colorDelta = value;
			this._colorDeltaSquared = Math.pow(value, 2);
		},


		/**
		 * Is gamma available?
		 *
		 * @method hasGamma
		 * @return {boolean}
		 */
		hasGamma: function () {
			return !!this._gamma;
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
			this._gamma = this._parseObject(value, Color, 'color');
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
			this._shift = this._parseObject(value, Shift, 'shift');
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
				list.push(this._parseObject(blockOut, BlockOut, 'block-out'));
			}.bind(this));

			this._blockOuts = list;
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
			this._areaImageA = this._parseObject(value, Rect, 'rect A');
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
			this._areaImageB = this._parseObject(value, Rect, 'rect B');
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

module.exports = PixelComparison;
