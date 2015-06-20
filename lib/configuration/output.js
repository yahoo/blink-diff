// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

var constants = require('../constants');

/**
 * @class Output
 * @extends Base
 * @module Configuration
 *
 * @property {string} _imagePath
 * #property {int} _limit
 * @property {int} _composition
 * @property {int} _copyImage
 */
var Output = Base.extend(

	/**
	 * Output constructor
	 *
	 * @param {object} options
	 * @param {string} options.imagePath Path to the output image
	 * @param {int} options.limit Limiting options for output image
	 * @param {int} options.composition Composition options for output image
	 * @param {int} options.copyImage Copy-image options for output image
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			imagePath: null,
			limit: constants.OUTPUT_DIFFERENT,
			composition: constants.COMPOSITION_AUTO,
			copyImage: constants.COPY_IMAGE_B
		}, [options]);

		this.setImagePath(options.imagePath);

		this.setLimitMode(options.limit);
		this.setCompositionMode(options.composition);
		this.setCopyImage(options.copyImage);
	},

	{
		/**
		 * Gets the path of the output image
		 *
		 * @method getImagePath
		 * @return {string}
		 */
		getImagePath: function () {
			return this._imagePath;
		},

		/**
		 * Sets the path of the output image
		 *
		 * @method setImagePath
		 * @param {string} path
		 */
		setImagePath: function (path) {
			this._imagePath = path;
		},

		/**
		 * Writes the image to a file if a path was given
		 *
		 * @method writeImage
		 * @param {PNGImage} image
		 * @return {boolean} Written?
		 */
		writeImage: function (image) {
			if (this.getImagePath()) {
				image.writeImageSync(this.getImagePath());
				return true;
			} else {
				return false;
			}
		},


		/**
		 * Gets the limit mode
		 *
		 * @method getLimitMode
		 * @return {int}
		 */
		getLimitMode: function () {
			return this._limit;
		},

		/**
		 * Sets the limit mode
		 *
		 * @method setLimitMode
		 * @param {int} value
		 */
		setLimitMode: function (value) {
			this._limit = value;
		},


		/**
		 * Is there an output limit?
		 *
		 * @method hasLimit
		 * @return {boolean}
		 */
		hasLimit: function () {
			return (this.getLimitMode() != constants.OUTPUT_ALL);
		},

		/**
		 * Is the output-limit for different images only?
		 *
		 * @method isLimitDifferent
		 * @return {boolean}
		 */
		isLimitDifferent: function () {
			return (this.getLimitMode() == constants.OUTPUT_DIFFERENT);
		},

		/**
		 * Is the output-limit for similar and different images?
		 *
		 * @method isLimitSimilar
		 * @return {boolean}
		 */
		isLimitSimilar: function () {
			return (this.getLimitMode() == constants.OUTPUT_SIMILAR);
		},

		/**
		 * Determines if a result-code is within the output limits
		 *
		 * @method withinOutputLimit
		 * @param resultCode
		 * @return {boolean}
		 */
		withinOutputLimit: function (resultCode) {
			if (!this.hasLimit()) {
				return true;
			} else {
				return resultCode <= this.getLimitMode();
			}
		},


		/**
		 * Gets the composition mode
		 *
		 * @method getCompositionMode
		 * @return {int}
		 */
		getCompositionMode: function () {
			return this._composition;
		},

		/**
		 * Sets the composition mode
		 *
		 * @method setCompositionMode
		 * @param {int} value
		 */
		setCompositionMode: function (value) {
			this._composition = value;
		},


		/**
		 * Is composition off?
		 *
		 * @method isCompositionOff
		 * @return {boolean}
		 */
		isCompositionOff: function () {
			return (this.getCompositionMode() == constants.COMPOSITION_OFF);
		},

		/**
		 * Is composition in auto-mode?
		 *
		 * @method isAutoComposition
		 * @return {boolean}
		 */
		isAutoComposition: function () {
			return (this.getCompositionMode() == constants.COMPOSITION_AUTO);
		},

		/**
		 * Is composition from left to right?
		 *
		 * @method isCompositionLeftToRight
		 * @return {boolean}
		 */
		isCompositionLeftToRight: function () {
			return (this.getCompositionMode() == constants.COMPOSITION_LEFT_TO_RIGHT);
		},

		/**
		 * Is composition from top to bottom?
		 *
		 * @method isCompositionTopToBottom
		 * @return {boolean}
		 */
		isCompositionTopToBottom: function () {
			return (this.getCompositionMode() == constants.COMPOSITION_TOP_TO_BOTTOM);
		},

		/**
		 * Creates a composition according to the configuration
		 *
		 * @method createComposition
		 * @param {PNGImage} imageA
		 * @param {PNGImage} imageB
		 * @param {PNGImage} imageOutput
		 * @return {PNGImage}
		 */
		createComposition: function (imageA, imageB, imageOutput) {

			var width, height, image = imageOutput;

			if (!this.isCompositionOff()) {
				this.log('Create composition');

				width = Math.max(imageA.getWidth(), imageB.getWidth());
				height = Math.max(imageA.getHeight(), imageB.getHeight());

				if (((width > height) && this.isAutoComposition()) || this.isCompositionTopToBottom()) {
					image = PNGImage.createImage(width, height * 3);

					imageA.getImage().bitblt(image.getImage(), 0, 0, imageA.getWidth(), imageA.getHeight(), 0, 0);
					imageOutput.getImage().bitblt(image.getImage(), 0, 0, imageOutput.getWidth(), imageOutput.getHeight(), 0, height);
					imageB.getImage().bitblt(image.getImage(), 0, 0, imageB.getWidth(), imageB.getHeight(), 0, height * 2);
				} else {
					image = PNGImage.createImage(width * 3, height);

					imageA.getImage().bitblt(image.getImage(), 0, 0, imageA.getWidth(), imageA.getHeight(), 0, 0);
					imageOutput.getImage().bitblt(image.getImage(), 0, 0, imageOutput.getWidth(), imageOutput.getHeight(), width, 0);
					imageB.getImage().bitblt(image.getImage(), 0, 0, imageB.getWidth(), imageB.getHeight(), width * 2, 0);
				}
			}

			return image;
		},


		/**
		 * Gets the copy-image mode
		 *
		 * @method getCopyImage
		 * @return {int}
		 */
		getCopyImage: function () {
			return this._copyImage;
		},

		/**
		 * Sets the copy-image mode
		 *
		 * @method setCopyImage
		 * @param {int} value
		 */
		setCopyImage: function (value) {
			this._copyImage = value;
		},


		/**
		 * Should any image be copied as base for the result?
		 *
		 * @method shouldCopyImage
		 * @return {boolean}
		 */
		shouldCopyImage: function () {
			return (this.getCopyImage() != constants.COPY_IMAGE_OFF);
		},

		/**
		 * Should image A be copied as base of result?
		 *
		 * @method shouldCopyImageA
		 * @return {boolean}
		 */
		shouldCopyImageA: function () {
			return (this.getCopyImage() == constants.COPY_IMAGE_A);
		},

		/**
		 * Should image B be copied as base of result?
		 *
		 * @method shouldCopyImageB
		 * @return {boolean}
		 */
		shouldCopyImageB: function () {
			return (this.getCopyImage() == constants.COPY_IMAGE_B);
		},


		/**
		 * Copies the image to the output-image as defined in the configuration
		 *
		 * @method copyImage
		 * @param {PNGImage} imageA
		 * @param {PNGImage} imageB
		 * @param {PNGImage} imageOutput
		 */
		copyImage: function (imageA, imageB, imageOutput) {

			if (this.shouldCopyImageA()) {
				imageA.getImage().bitblt(imageOutput.getImage(), 0, 0, imageA.getWidth(), imageA.getHeight(), 0, 0);

			} else if (this.shouldCopyImageB()) {
				imageB.getImage().bitblt(imageOutput.getImage(), 0, 0, imageB.getWidth(), imageB.getHeight(), 0, 0);
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_OUTPUT'
	}
);

module.exports = Output;
