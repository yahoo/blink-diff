// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

var constants = require('./constants');
var assert = require('assert');

/**
 * @class Compatibility
 * @extends Base
 * @module Compare
 *
 * @property {object} _options
 */
var Compatibility = Base.extend(

	/**
	 * Constructor for the compatibility object
	 *
	 * @constructor
	 * @param {object} options
	 * @param {PNGImage|Buffer} options.imageA Image object of first image
	 * @param {string} options.imageAPath Path to first image
	 * @param {PNGImage|Buffer} options.imageB Image object of second image
	 * @param {string} options.imageBPath Path to second image
	 * @param {string} [options.imageOutputPath=undefined] Path to output image file
	 * @param {int} [options.imageOutputLimit=constants.OUTPUT_ALL] Determines when an image output is created
	 * @param {string} [options.thresholdType=constants.THRESHOLD_PIXEL] Defines the threshold of the comparison
	 * @param {int} [options.threshold=500] Threshold limit according to the comparison limit.
	 * @param {number} [options.delta=20] Distance between the color coordinates in the 4 dimensional color-space that will not trigger a difference.
	 * @param {int} [options.outputMaskRed=255] Value to set for red on difference pixel. 'Undefined' will not change the value.
	 * @param {int} [options.outputMaskGreen=0] Value to set for green on difference pixel. 'Undefined' will not change the value.
	 * @param {int} [options.outputMaskBlue=0] Value to set for blue on difference pixel. 'Undefined' will not change the value.
	 * @param {int} [options.outputMaskAlpha=255] Value to set for the alpha channel on difference pixel. 'Undefined' will not change the value.
	 * @param {float} [options.outputMaskOpacity=0.7] Strength of masking the pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel.
	 * @param {int} [options.outputShiftRed=255] Value to set for red on shifted pixel. 'Undefined' will not change the value.
	 * @param {int} [options.outputShiftGreen=165] Value to set for green on shifted pixel. 'Undefined' will not change the value.
	 * @param {int} [options.outputShiftBlue=0] Value to set for blue on shifted pixel. 'Undefined' will not change the value.
	 * @param {int} [options.outputShiftAlpha=255] Value to set for the alpha channel on shifted pixel. 'Undefined' will not change the value.
	 * @param {float} [options.outputShiftOpacity=0.7] Strength of masking the shifted pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel.
	 * @param {int} [options.outputBackgroundRed=0] Value to set for red as background. 'Undefined' will not change the value.
	 * @param {int} [options.outputBackgroundGreen=0] Value to set for green as background. 'Undefined' will not change the value.
	 * @param {int} [options.outputBackgroundBlue=0] Value to set for blue as background. 'Undefined' will not change the value.
	 * @param {int} [options.outputBackgroundAlpha=undefined] Value to set for the alpha channel as background. 'Undefined' will not change the value.
	 * @param {float} [options.outputBackgroundOpacity=0.6] Strength of masking the pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel.
	 * @param {object|object[]} [options.blockOut] Object or list of objects with coordinates of blocked-out areas.
	 * @param {int} [options.blockOutRed=0] Value to set for red on blocked-out pixel. 'Undefined' will not change the value.
	 * @param {int} [options.blockOutGreen=0] Value to set for green on blocked-out pixel. 'Undefined' will not change the value.
	 * @param {int} [options.blockOutBlue=0] Value to set for blue on blocked-out pixel. 'Undefined' will not change the value.
	 * @param {int} [options.blockOutAlpha=255] Value to set for the alpha channel on blocked-out pixel. 'Undefined' will not change the value.
	 * @param {float} [options.blockOutOpacity=1.0] Strength of masking the blocked-out pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel.
	 * @param {boolean} [options.copyImageAToOutput=true]  Copies the first image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the first image.
	 * @param {boolean} [options.copyImageBToOutput=false] Copies the second image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the second image.
	 * @param {string[]} [options.filter=[]] Filters that will be applied before the comparison. Available filters are: blur, grayScale, lightness, luma, luminosity, sepia
	 * @param {boolean} [options.debug=false] When set, then the applied filters will be shown on the output image.
	 * @param {boolean} [options.composition=true] Should a composition be created to compare?
	 * @param {boolean} [options.composeLeftToRight=false] Create composition from left to right, otherwise let it decide on its own whats best
	 * @param {boolean} [options.composeTopToBottom=false] Create composition from top to bottom, otherwise let it decide on its own whats best
	 * @param {boolean} [options.hideShift=false] Hides shift highlighting by using the background color instead
	 * @param {int} [options.hShift=2] Horizontal shift for possible antialiasing
	 * @param {int} [options.vShift=2] Vertical shift for possible antialiasing
	 * @param {object} [options.cropImageA=null] Cropping for first image (default: no cropping)
	 * @param {int} [options.cropImageA.x=0] Coordinate for left corner of cropping region
	 * @param {int} [options.cropImageA.y=0] Coordinate for top corner of cropping region
	 * @param {int} [options.cropImageA.width] Width of cropping region (default: Width that is left)
	 * @param {int} [options.cropImageA.height] Height of cropping region (default: Height that is left)
	 * @param {object} [options.cropImageB=null] Cropping for second image (default: no cropping)
	 * @param {int} [options.cropImageB.x=0] Coordinate for left corner of cropping region
	 * @param {int} [options.cropImageB.y=0] Coordinate for top corner of cropping region
	 * @param {int} [options.cropImageB.width] Width of cropping region (default: Width that is left)
	 * @param {int} [options.cropImageB.height] Height of cropping region (default: Height that is left)
	 * @param {boolean} [options.perceptual=false] Turns perceptual comparison on
	 * @param {float} [options.gamma] Gamma correction for all colors
	 * @param {float} [options.gammaR] Gamma correction for red
	 * @param {float} [options.gammaG] Gamma correction for green
	 * @param {float} [options.gammaB] Gamma correction for blue
	 */
	function (options) {
		this._options = options;
	},

	{
		/**
		 * Generates a configuration object
		 *
		 * @method generate
		 * @return {object}
		 */
		generate: function () {

			var options = this._options,
				blockOuts,
				comparison,
				config;

			assert.ok(options.imageAPath || options.imageA, "Image A not given.");
			assert.ok(options.imageBPath || options.imageB, "Image B not given.");

			options.blockOut = options.blockOut || [];
			if (typeof options.blockOut != 'object' && (options.blockOut.length !== undefined)) {
				options.blockOut = [options.blockOut];
			}

			blockOuts = [];
			options.blockOut.forEach(function (blockOut) {
				blockOuts.push({
					visible: true,
					area: {
						left: blockOut.x,
						top: blockout.y,
						width: blockout.width,
						height: blockout.height
					},
					color: {
						red: options.blockOutRed || 0,
						green: options.blockOutGreen || 0,
						blue: options.blockOutBlue || 0,
						alpha: options.blockOutAlpha || 255,
						opacity: options.blockOutOpacity || 1.0
					}
				});
			});

			comparison = {
				type: 'pixel',
				colorDelta: options.delta || 20,

				gamma: {
					red: options.gamma || options.gammaR,
					green: options.gamma || options.gammaG,
					blue: options.gamma || options.gammaB
				},
				perceptual: !!options.perceptual,
				filters: options.filter || [],

				shift: {
					active: !options.hideShift,
					horizontal: options.hShift || 2,
					vertical: options.vShift || 2
				},

				blockOuts: blockOuts,

				areaImageA: {
					left: 0,
					top: 0,
					width: null,
					height: null
				},
				areaImageB: {
					left: 0,
					top: 0,
					width: null,
					height: null
				}
			};

			config = {

				debug: !!options.debug,
				verbose: !!options.debug,

				imageA: {
					image: options.imageA || options.imageAPath,
					crop: undefined
				},
				imageB: {
					image: options.imageB || options.imageBPath,
					crop: undefined
				},

				comparisons: [ comparison ],

				threshold: {
					type: options.thresholdType || constants.THRESHOLD_PIXEL,
					value: options.threshold || 500
				},

				diffColor: {
					red: options.outputMaskRed || 255,
					green: options.outputMaskGreen || 0,
					blue: options.outputMaskBlue || 0,
					alpha: options.outputMaskAlpha || 255,
					opacity: options.outputMaskOpacity || 0.7
				},

				backgroundColor: {
					red: options.outputBackgroundRed || 0,
					green: options.outputBackgroundGreen || 0,
					blue: options.outputBackgroundBlue || 0,
					alpha: options.outputBackgroundAlpha,
					opacity: options.outputBackgroundOpacity || 0.6
				},
				ignoreColor: {
					red: options.outputShiftRed || 200,
					green: options.outputShiftGreen || 100,
					blue: options.outputShiftBlue || 0,
					alpha: options.outputShiftAlpha || 255,
					opacity: options.outputShiftOpacity || 0.7
				},

				output: {
					imagePath: options.imageOutputPath,
					limit: options.imageOutputLimit || constants.OUTPUT_ALL,
					composition: options.composeLeftToRight ? constants.COMPOSITION_LEFT_TO_RIGHT : (options.composeTopToBottom ? constants.COMPOSITION_TOP_TO_BOTTOM : constants.COMPOSITION_AUTO),
					copyImage: options.copyImageBToOutput ? constants.COPY_IMAGE_B : constants.COPY_IMAGE_A
				}
			};

			if (options.cropImageA) {
				config.imageA.crop = {
					left: options.cropImageA.x,
					top: options.cropImageA.y,
					width: options.cropImageA.width,
					height: options.cropImageA.height
				};
			}
			if (options.cropImageB) {
				config.imageB.crop = {
					left: options.cropImageB.x,
					top: options.cropImageB.y,
					width: options.cropImageB.width,
					height: options.cropImageB.height
				};
			}

			return config;
		}
	}
);

module.exports = Compatibility;
