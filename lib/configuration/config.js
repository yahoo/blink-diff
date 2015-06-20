// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

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
 * @property {Color} _diffColor
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
	 * @param {object|Color} options.diffColor
	 * @param {object|Color} options.backgroundColor
	 * @param {object|Color} options.ignoreColor
	 * @param {object|Output} options.output
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			debug: false,
			verbose: false,

			imageA: {},
			imageB: {},

			comparisons: [],

			threshold: {},

			diffColor: {},
			backgroundColor: {},
			ignoreColor: {},

			output: {}
		}, [options]);

		this.setDebugMode(options.debug);
		this.setVerboseMode(options.verbose);

		this.setImageA(options.imageA);
		this.setImageB(options.imageB);

		this.setComparisons(options.comparisons);

		this.setThreshold(options.threshold);

		this.setDiffColor(options.diffColor);
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
			this._imageA = this._parseObject(value, Image, 'image A');
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
			this._imageB = this._parseObject(value, Image, 'image B');
		},


		/**
		 * Gets the comparisons
		 *
		 * @method getComparisons
		 * @return {PixelComparison[]|StructureComparison[]}
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
			this._threshold = this._parseObject(value, Threshold, 'threshold');
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
			this._diffColor = this._parseObject(value, Color, 'color');
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
			this._backgroundColor = this._parseObject(value, Color, 'color');
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
			this._ignoreColor = this._parseObject(value, Color, 'color');
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
			this._output = this._parseObject(value, Output, 'output');
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

module.exports = Config;
