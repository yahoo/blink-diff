// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var PNGImage = require('pngjs-image'),
	Config = require('./lib/configuration/config'),
	Image = require('./lib/image'),
	PixelComparator = require('./lib/pixelComparator'),
	constants = require('./lib/constants'),
	Base = require('preceptor-core').Base;

/**
 * @class BlinkDiff
 * @extends Base
 * @module Compare
 *
 * @property {Config} _configuration
 * @property {PNGImage} _outputImage
 * @property {PNGImage} _highlightImage
 */
var BlinkDiff = Base.extend(

	/**
	 * Constructor
	 *
	 * @constructor
	 * @param {object} options
	 */
	function (options) {
		options = options || {};
		options.blinkDiff = this;
		this._configuration = new Config(options);
	},

	{
		/**
		 * Gets the configuration
		 *
		 * @method getConfig
		 * @return {Config}
		 */
		getConfig: function () {
			return this._configuration;
		},

		/**
		 * Gets the output image
		 *
		 * @method getOutputImage
		 * @return {PNGImage}
		 */
		getOutputImage: function () {
			return this._outputImage;
		},

		/**
		 * Gets the highlight image
		 *
		 * @method getHighlightImage
		 * @return {PNGImage}
		 */
		getHighlightImage: function () {
			return this._highlightImage;
		},


		/**
		 * Logs events to the console
		 *
		 * @method log
		 * @param {string} text
		 */
		log: function (text) {
			if (this._configuration.isVerboseMode()) {
				console.log(text);
			}
		},

		/**
		 * Clips the images to the lower resolution of both, if needed
		 *
		 * @private
		 * @method _clip
		 * @param {PNGImage} imageA Source image
		 * @param {PNGImage} imageB Destination image
		 */
		_clip: function (imageA, imageB) {

			var minWidth, minHeight;

			if ((imageA.getWidth() != imageB.getWidth()) || (imageA.getHeight() != imageB.getHeight())) {

				minWidth = Math.min(imageA.getWidth(), imageB.getWidth());
				minHeight = Math.min(imageA.getHeight(), imageB.getHeight());

				this.log("Clipping to " + minWidth + " x " + minHeight);

				imageA.clip(0, 0, minWidth, minHeight);
				imageB.clip(0, 0, minWidth, minHeight);
			}
		},

		/**
		 * Has comparison passed?
		 *
		 * @method hasPassed
		 * @param {int} result Comparison result-code
		 * @return {boolean}
		 */
		hasPassed: function (result) {
			return ((result !== constants.RESULT_DIFFERENT) && (result !== constants.RESULT_UNKNOWN));
		},

		/**
		 * Runs the comparison synchronously
		 *
		 * @method process
		 * @return {Object} Result of comparison { code, differences, dimension, width, height }
		 */
		process: function () {

			// Catch all image errors
			PNGImage.log = function (text) {
				this.log('ERROR: ' + text);
				throw new Error('ERROR: ' + text);
			}.bind(this);

			var config = this.getConfig(),

				dimension,
				flagField,
				imageA = config.getImageA().getProcessedImage(),
				imageB = config.getImageB().getProcessedImage(),
				compareImageA, compareImageB,

				highlightImage,
				outputImage,
				differences = 0,
				shifts = 0,
				i, index, color,
				exported = false,
				code = constants.RESULT_UNKNOWN;

			this._highlightImage = null;
			this._outputImage = null;

			this._clip(imageA, imageB);

			dimension = imageA.getWidth() * imageB.getWidth();
			flagField = new Buffer(dimension);
			flagField.fill(0);

			config.getComparisons().forEach(function (comparison, index) {

				this.log('Apply comparison #' + index);

				compareImageA = Image.processImage(PNGImage.copyImage(imageA), comparison);
				compareImageB = Image.processImage(PNGImage.copyImage(imageB), comparison);

				var pixelCompare = new PixelComparator(compareImageA, compareImageB, config);
				pixelCompare.compare(comparison, flagField);

			}.bind(this));

			if (config.isDebugMode()) { // In debug-mode? Export comparison image

				this.log('In debug-mode');

				imageA = compareImageA || imageA;
				imageB = compareImageB || imageB;
			}

			highlightImage = PNGImage.createImage(imageA.getWidth(), imageA.getHeight());

			outputImage = PNGImage.createImage(imageA.getWidth(), imageA.getHeight());
			config.getOutput().copyImage(imageA, imageB, outputImage);

			// Draw and count flag-field
			for(i = 0; i < dimension; i++) {

				index = i * 4;

				// Count
				if (flagField[i] & 1 == 1) {
					differences++;
				}
				if (flagField[i] & 2 == 2) {
					shifts++;
				}

				// Draw
				if (flagField[i] & 1 == 1) {
					color = config.getDiffColor();

				} else if (flagField[i] & 2 == 2) {
					color = config.getIgnoreColor();

				} else {
					color = config.getBackgroundColor();
				}

				outputImage.setAtIndex(index, color.getColor(true, true));
				highlightImage.setAtIndex(index, color.getColor(false, false));
			}

			// Create composition if requested
			this._highlightImage = highlightImage;
			this._outputImage = config.getOutput().createComposition(imageA, imageB, outputImage);

			// Result
			if (differences == 0) {
				this.log("Images are identical or near identical");
				code = constants.RESULT_IDENTICAL;

			} else if (config.getThreshold().isAboveThreshold(differences, dimension)) {
				this.log("Images are visibly different");
				this.log(differences + " pixels are different");
				code = constants.RESULT_DIFFERENT;

			} else {
				this.log("Images are similar");
				this.log(differences + " pixels are different");
				code = constants.RESULT_SIMILAR;
			}

			// Need to write to the filesystem?
			if (config.getOutput().withinOutputLimit(code)) {
				if (config.getOutput().writeImage(this._outputImage)) {
					this.log("Wrote differences to " + config.getOutput().getImagePath());
					exported = true;
				}
			}

			return {
				code: code,
				differences: differences,
				shifts: shifts,
				dimension: dimension,
				width: imageA.getWidth(),
				height: imageA.getWidth(),
				highlightImage: highlightImage,
				outputImage: outputImage,
				exported: exported
			};
		}
	},

	{
		/**
		 * Version
		 *
		 * @static
		 * @property version
		 * @type {string}
		 */
		version: require('./package.json').version
	}
);

module.exports = BlinkDiff;
