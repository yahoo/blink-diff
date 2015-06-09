// Copyright 2014-2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var PNGImage = require('pngjs-image'),
	Config = require('./lib/configuration/config'),
	Image = require('./lib/image'),
	PixelComparator = require('./lib/pixelComparator');


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
	 * Runs the comparison synchronously
	 *
	 * @method runSync
	 * @return {Object} Result of comparison { code, differences, dimension, width, height }
	 */
	runSync: function () {

		var config = this.getConfig(),

			dimensions,
			flagField,
			imageA = config.getImageA().getCroppedImage(),
			imageB = config.getImageB().getCroppedImage(),

			imageOutput;

		this._clip(imageA, imageB);

		dimensions = imageA.getWidth() * imageB.getWidth();
		flagField = new Buffer(dimensions);
		flagField.fill(0);

		config.getComparisons().forEach(function (comparison) {

			var compareImageA = PNGImage.copyImage(imageA),
				compareImageB = PNGImage.copyImage(imageB),
				pixelCompare;

			compareImageA = Image.processImage(compareImageA, comparison);
			compareImageB = Image.processImage(compareImageB, comparison);

			pixelCompare = new PixelComparator(compareImageA, compareImageB, comparison);
			pixelCompare.compare(flagField);
		});

		imageOutput = PNGImage.createImage(imageA.getWidth(), imageA.getHeight());
	}
};

module.exports = BlinkDiff;
