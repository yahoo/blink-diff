// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

var Color = require('./atoms/color');
var Rect = require('./atoms/rect');
var Threshold = require('./atoms/threshold');
var Shift = require('./shift');
var BlockOut = require('./blockOut');
var Output = require('./output');

/**
 * @class Comparison
 * @extends Base
 * @module Configuration
 *
 * @property {Rect} _area
 * @property {Shift} _shift
 * @property {Threshold} _threshold
 * @property {Color} _gamma
 * @property {boolean} _perceptual
 * @property {string[]} _filters
 * @property {BlockOut[]} _blockOuts
 * @property {Color} _diffColor
 * @property {Color} _backgroundColor
 * @property {Output} _output
 */
var Comparison = Base.extend(

	/**
	 * Comparison constructor
	 *
	 * @param {object} options
	 * @constructor
	 */
	function (options) {
		this.__super();

		if (options.area) {
			this.setAreaRect(options.area);
		}

		if (options.shift) {
			this.setShift(options.shift);
		}
		if (options.threshold) {
			this.setThreshold(options.threshold);
		}

		if (options.gamma) {
			this.setGamma(options.gamma);
		}
		if (options.perceptual !== undefined) {
			this.setPerceptual(options.perceptual);
		}

		if (options.filters) {
			this.setFilters(options.filters);
		}

		if (options.blockOuts) {
			this.setBlockOuts(options.blockOuts);
		}

		if (options.diffColor) {
			this.setDiffColor(options.diffColor);
		}
		if (options.backgroundColor) {
			this.setBackgroundColor(options.backgroundColor);
		}

		if (options.output) {
			this.setOutput(options.output);
		}
	},

	{
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
			this._area = this._parseRect(value);
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
		 * Gets the threshold
		 *
		 * @method getThreshold
		 * @return {Threshold}
		 */
		getThreshold: function () {
			return this._threshold;
		},

		/**
		 * Sets the threshold
		 *
		 * @method setThreshold
		 * @param {object|Threshold} value
		 */
		setThreshold: function (value) {
			this._threshold = this._parseThreshold(value);
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
		 * @method getDiffColor
		 * @return {Color}
		 */
		getDiffColor: function () {
			return this._diffColor;
		},

		/**
		 * Sets the diff-color
		 *
		 * @method setDiffColor
		 * @param {object|Color} value
		 */
		setDiffColor: function (value) {
			this._diffColor = this._parseColor(value);
		},


		/**
		 * Gets the background-color
		 *
		 * @method getBackgroundColor
		 * @return {Color}
		 */
		getBackgroundColor: function () {
			return this._backgroundColor;
		},

		/**
		 * Sets the background-color
		 *
		 * @method setBackgroundColor
		 * @param {object|Color} value
		 */
		setBackgroundColor: function (value) {
			this._backgroundColor = this._parseColor(value);
		},


		/**
		 * Gets the output
		 *
		 * @method getOutput
		 * @return {Output}
		 */
		getOutput: function () {
			return this._output;
		},

		/**
		 * Sets the output
		 *
		 * @method setOutput
		 * @param {object|Output} value
		 */
		setOutput: function (value) {
			this._output = this._parseOutput(value);
		},


		/**
		 * Processes the image, applying all configurations
		 *
		 * @method processImage
		 * @param {PNGImage} image
		 */
		processImage: function (image) {

			var rect = this.getAreaRect().getCoordinates();

			image = PNGImage.copyImage(image);
			image.clip(rect.x, rect.y, rect.width || image.getWidth(), rect.height || image.getHeight());

			return image;
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

			if (typeof value == 'object' && !value instanceof BlockOut) {
				value = new BlockOut(value);
			}

			if (value instanceof BlockOut) {
				return value;
			} else {
				throw new Error('Unknown block-out descriptor.');
			}
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

			if (typeof value == 'object' && !value instanceof Shift) {
				value = new Shift(value);
			}

			if (value instanceof Shift) {
				return value;
			} else {
				throw new Error('Unknown shift descriptor.');
			}
		},

		/**
		 * Parses threshold information
		 *
		 * @method _parseThreshold
		 * @param {object|Threshold} value Threshold or threshold-description
		 * @returns {Threshold}
		 * @private
		 */
		_parseThreshold: function (value) {

			if (typeof value == 'object' && !value instanceof Threshold) {
				value = new Threshold(value);
			}

			if (value instanceof Threshold) {
				return value;
			} else {
				throw new Error('Unknown threshold descriptor.');
			}
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

			if (typeof value == 'object' && !value instanceof Rect) {
				value = new Rect(value);
			}

			if (value instanceof Rect) {
				return value;
			} else {
				throw new Error('Unknown rect descriptor.');
			}
		},

		/**
		 * Parses output information
		 *
		 * @method _parseOutput
		 * @param {object|Output} value Output or output-description
		 * @returns {Output}
		 * @private
		 */
		_parseOutput: function (value) {

			if (typeof value == 'object' && !value instanceof Output) {
				value = new Output(value);
			}

			if (value instanceof Output) {
				return value;
			} else {
				throw new Error('Unknown output descriptor.');
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_COMPARISON'
	}
);
