// Copyright 2014-2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var PNGImage = require('pngjs-image'),
	Config = require('./lib/configuration/config'),
	Image = require('./lib/image'),
	PixelComparator = require('./lib/pixelComparator'),
	constants = require('./lib/constants');


/**
 *
 * @param options
 * @constructor
 *
 * @property {Config} _configuration
 */
function BlinkDiff (options) {
	this._configuration = new Config(options);
}


/**
 * Version of class
 *
 * @static
 * @property version
 * @type {string}
 */
BlinkDiff.version = require('./package.json').version;

BlinkDiff.prototype = {

	/**
	 * @method getConfig
	 * @return {Config}
	 */
	getConfig: function () {
		return this._configuration;
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
	 * @method runSync
	 * @return {Object} Result of comparison { code, differences, dimension, width, height }
	 */
	runSync: function () {

		var config = this.getConfig(),

			dimension,
			flagField,
			imageA = config.getImageA().getProcessedImage(),
			imageB = config.getImageB().getProcessedImage(),

			imageOutput,
			differences = 0,
			shifts = 0,
			i, index, color,
			code = constants.RESULT_UNKNOWN;

		this._clip(imageA, imageB);

		dimension = imageA.getWidth() * imageB.getWidth();
		flagField = new Buffer(dimension);
		flagField.fill(0);

		config.getComparisons().forEach(function (comparison) {

			var compareImageA = PNGImage.copyImage(imageA),
				compareImageB = PNGImage.copyImage(imageB),
				pixelCompare;

			compareImageA = Image.processImage(compareImageA, comparison);
			compareImageB = Image.processImage(compareImageB, comparison);

			pixelCompare = new PixelComparator(compareImageA, compareImageB, config);
			pixelCompare.compare(comparison, flagField);
		});

		imageOutput = PNGImage.createImage(imageA.getWidth(), imageA.getHeight());
		config.getOutput().copyImage(imageA, imageB, imageOutput);

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

			imageOutput.setAtIndex(index, color);
		}

		// Create composition if requested
		this._imageOutput = config.getOutput().createComposition(imageA, imageB, imageOutput);

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
			config.getOutput().writeImage(this._imageOutput);
		}

		return {
			code: code,
			differences: differences,
			shifts: shifts,
			dimension: dimension,
			width: imageA.getWidth(),
			height: imageA.getWidth()
		};
	}
};

module.exports = BlinkDiff;
