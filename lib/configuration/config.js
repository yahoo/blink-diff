// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');

var Image = require('./image');
var PixelComparison = require('./pixelComparison');
var StructureComparison = require('./structureComparison');
var Threshold = require('./atoms/threshold');
var Color = require('./atoms/color');
var Output = require('./output');

var constants = require('../constants');

/**
 * @class Config
 * @extends Base
 * @module Configuration
 *
 * @property {boolean} debug
 * @property {boolean} verbose
 * @property {Image} _imageA
 * @property {Image} _imageB
 * @property {PixelComparison[]|StructureComparison[]} _comparisons
 * @property {Threshold} _threshold
 * @property {Color} _backgroundColor
 * @property {Color} _ignoreColor
 * @property {Output} _output
 */
var Config = Base.extend(

	/**
	 * Config constructor
	 *
	 * @param {object} options
	 * @param {boolean} options.debug
	 * @param {boolean} options.verbose
	 * @param {object|Image} options.imageA
	 * @param {object|Image} options.imageB
	 * @param {object[]|PixelComparison[]|StructureComparison[]} options.comparisons
	 * @param {object|Threshold} options.threshold
	 * @param {object|Color} options.backgroundColor
	 * @param {object|Color} options.ignoreColor
	 * @param {object|Output} options.output
	 * @constructor
	 */
	function (options) {
		this.__super();

		this.setDebugMode(options.debug);
		this.setVerboseMode(options.verbose);

		this.setImageA(options.imageA);
		this.setImageB(options.imageB);

		this.setComparisons(options.comparisons);

		this.setThreshold(options.threshold);

		this.setBackgroundColor(options.backgroundColor);
		this.setIgnoreColor(options.ignoreColor);

		this.setOutput(options.output);
	},

	{
		/**
		 * Is in debug-mode?
		 *
		 * @method isDebugMode
		 * @return {boolean}
		 */
		isDebugMode: function () {
			return this._debug;
		},

		/**
		 * Sets the debug-mode
		 *
		 * @method setDebugMode
		 * @param {boolean} value
		 */
		setDebugMode: function (value) {
			this._debug = !!value;
		},


		/**
		 * Is in verbose-mode?
		 *
		 * @method isVerboseMode
		 * @return {boolean}
		 */
		isVerboseMode: function () {
			return this._verbose;
		},

		/**
		 * Sets the verbose-mode
		 *
		 * @method setVerboseMode
		 * @param {boolean} value
		 */
		setVerboseMode: function (value) {
			this._verbose = !!value;
		},


		/**
		 * Gets the first image
		 *
		 * @method getImageA
		 * @return {Image}
		 */
		getImageA: function () {
			return this._imageA;
		},

		/**
		 * Sets the first image
		 *
		 * @method setImageA
		 * @param {object|Image} value
		 */
		setImageA: function (value) {
			this._imageA = this._parseImage(value);
		},


		/**
		 * Gets the second image
		 *
		 * @method getImageB
		 * @return {Image}
		 */
		getImageB: function () {
			return this._imageB;
		},

		/**
		 * Sets the second image
		 *
		 * @method setImageB
		 * @param {object|Image} value
		 */
		setImageB: function (value) {
			this._imageB = this._parseImage(value);
		},


		/**
		 * Gets the comparisons
		 *
		 * @method getComparisons
		 * @return {Comparison[]}
		 */
		getComparisons: function () {
			return this._comparisons;
		},

		/**
		 * Sets the comparisons
		 *
		 * @method setComparisons
		 * @param {object[]|PixelComparison[]|StructureComparison[]} value
		 */
		setComparisons: function (value) {

			var list = [];

			value.forEach(function (comparison) {
				list.push(this._parseComparison(comparison));
			}.bind(this));

			this._comparisons = list;
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
		 * Gets the ignore-color
		 *
		 * @method getIgnoreColor
		 * @return {Color}
		 */
		getIgnoreColor: function () {
			return this._ignoreColor;
		},

		/**
		 * Sets the ignore-color
		 *
		 * @method setIgnoreColor
		 * @param {object|Color} value
		 */
		setIgnoreColor: function (value) {
			this._ignoreColor = this._parseColor(value);
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
		 * Parses image information
		 *
		 * @method _parseImage
		 * @param {object|Image} value Image or image-description
		 * @returns {Image}
		 * @private
		 */
		_parseImage: function (value) {
			return this._parseObject(value, Image, "image");
		},

		/**
		 * Parses comparison information
		 *
		 * @method _parseComparison
		 * @param {object|PixelComparison|StructureComparison} value Comparison or comparison-description
		 * @returns {PixelComparison|StructureComparison}
		 * @private
		 */
		_parseComparison: function (value) {

			var Constr = null,
				text = "comparison";

			if (value.type === constants.COMPARISON_PIXEL) {
				Constr = PixelComparison;
				text = 'pixel-comparison';

			} else if (value.type === constants.COMPARISON_STRUCTURE) {
				Constr = StructureComparison;
				text = 'structural-comparison'
			}

			return this._parseObject(value, Constr, text);
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
			return this._parseObject(value, Threshold, "threshold");
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
			return this._parseObject(value, Color, "color");
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
			return this._parseObject(value, Output, "output");
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_CONFIG'
	}
);
