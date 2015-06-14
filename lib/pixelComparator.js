// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

var Rect = require('./configuration/atoms/rect');

/**
 * @class PixelComparator
 * @extends Base
 * @module Compare
 *
 * @property {PNGImage} _imageA
 * @property {PNGImage} _imageB
 * @property {Config} _config
 */
var PixelComparator = Base.extend(

	/**
	 * Constructor for the pixel comparator
	 *
	 * @constructor
	 * @param {PNGImage} imageA
	 * @param {PNGImage} imageB
	 * @param {Config} config
	 */
	function (imageA, imageB, config) {
		this._imageA = imageA;
		this._imageB = imageB;
		this._config = config;
	},

	{
		/**
		 * Gets image A
		 *
		 * @method getImageA
		 * @return {PNGImage}
		 */
		getImageA: function () {
			return this._imageA;
		},

		/**
		 * Gets image B
		 *
		 * @method getImageB
		 * @return {PNGImage}
		 */
		getImageB: function () {
			return this._imageB;
		},


		/**
		 * Gets the configuration
		 *
		 * @method getConfig
		 * @return {Config}
		 */
		getConfig: function () {
			return this._config;
		},


		/**
		 * Calculates the distance of colors in the 4 dimensional color space
		 *
		 * Note: The distance is squared for faster calculation.
		 *
		 * @method _colorDelta
		 * @param {int} offsetA Offset in first image
		 * @param {int} offsetB Offset in second image
		 * @return {number} Distance
		 * @private
		 */
		_colorDelta: function (offsetA, offsetB) {

			var imageA = this._imageA.getData(),
				imageB = this._imageB.getData();

			return Math.pow(imageA[offsetA] - imageB[offsetB], 2) +
				Math.pow(imageA[offsetA + 1] - imageB[offsetB + 1], 2) +
				Math.pow(imageA[offsetA + 2] - imageB[offsetB + 2], 2) +
				Math.pow(imageA[offsetA + 3] - imageB[offsetB + 3], 2);
		},

		/**
		 * Determines the areas that needs to be compared
		 *
		 * @method _getAreas
		 * @param {PixelComparison} comparison
		 * @return {Rect[]}
		 * @private
		 */
		_getAreas: function (comparison) {

			var areaA, areaB,
				areas = [],
				imageArea = new Rect({
					x: 0,
					y: 0,
					width: this._imageA.getWidth(),
					height: this._imageA.getHeight()
				});

			if (!comparison.getAreaImageA() || !comparison.getAreaImageB()) {
				areas.push(imageArea);
				areas.push(imageArea);

			} else {

				areaA = comparison.getAreaImageA().clone().limitCoordinates(imageArea);
				areaB = comparison.getAreaImageB().clone().limitCoordinates(imageArea);

				areaA.setWidth(Math.min(areaA.getWidth(), areaB.getWidth()));
				areaA.setHeight(Math.min(areaA.getHeight(), areaB.getHeight()));

				areaB.setWidth(areaA.getWidth());
				areaB.setHeight(areaA.getHeight());

				areas.push(areaA);
				areas.push(areaB);
			}

			return areas;
		},

		/**
		 * Compares two images and sets a flags in flag-field
		 *
		 * @method compare
		 * @param {PixelComparison} comparison
		 * @param {Buffer} flagField
		 */
		compare: function (comparison, flagField) {

			var flagFieldIndexA, dataIndexA,
				flagFieldIndexB, dataIndexB,
				x, y, delta,
				areas = this._getAreas(comparison),
				areaA = areas[0].getCoordinates(),
				areaB = areas[1].getCoordinates(),
				width = areaA.width,
				height = areaA.height,
				deltaThreshold = comparison.getColorDeltaSquared(),
				useImageB = this.getConfig().getOutput().shouldCopyImageB();

			for (x = 0; x < width; x++) {
				for (y = 0; y < height; y++) {

					flagFieldIndexA = (x + areaA.x) + ((y + areaA.y) * width);
					dataIndexA = 4 * flagFieldIndexA;

					flagFieldIndexB = (x + areaB.x) + ((y + areaB.y) * width);
					dataIndexB = 4 * flagFieldIndexB;

					delta = this._colorDelta(dataIndexA, dataIndexB);

					if (delta > deltaThreshold) {

						if (this._shiftCompare(x, y, dataIndexA, comparison, this._imageA, areaA, this._imageB, areaB) &&
							this._shiftCompare(x, y, dataIndexB, comparison, this._imageB, areaB, this._imageA, areaA)) {

							flagField[useImageB ? flagFieldIndexB : flagFieldIndexA] |= 2;
						} else {
							flagField[useImageB ? flagFieldIndexB : flagFieldIndexA] |= 1;
						}
					}
				}
			}
		},

		/**
		 * Comparison, covering sub-pixel shifts
		 *
		 * @method _shiftCompare
		 * @param {int} x X-offset for current comparison coordinate
		 * @param {int} y Y-offset for current comparison coordinate
		 * @param {int} colorIndex Index of color in data
		 * @param {PixelComparison} comparison Comparison configuration
		 * @param {PNGImage} imageSrc Source image
		 * @param {object} areaSrc Area that is compared in source image
		 * @param {PNGImage} imageDst Destination image
		 * @param {object} areaDst Area that is compared in destination image
		 * @return {boolean} Within limits?
		 * @private
		 */
		_shiftCompare: function (x, y, colorIndex, comparison, imageSrc, areaSrc, imageDst, areaDst) {

			var xOffset, xLow, xHigh,
				yOffset, yLow, yHigh,

				delta, localDeltaThreshold,
				dataIndexSrc, dataIndexDst,

				deltaThreshold = comparison.getColorDeltaSquared(),

				shift = comparison.getShift(),
				hShift = shift.getHorizontal(),
				vShift = shift.getVertical(),

				width = areaSrc.width,
				height = areaSrc.height;


			if ((hShift > 0) || (vShift > 0)) {

				xLow = this._calculateLowerLimit(x, 0, hShift);
				xHigh = this._calculateUpperLimit(x, width - 1, hShift);

				yLow = this._calculateLowerLimit(y, 0, vShift);
				yHigh = this._calculateUpperLimit(y, height - 1, vShift);

				for (xOffset = xLow; xOffset <= xHigh; xOffset++) {
					for (yOffset = yLow; yOffset <= yHigh; yOffset++) {

						if ((xOffset != 0) || (yOffset != 0)) {

							dataIndexSrc = ((x + areaSrc.x + xOffset) + ((y + areaSrc.y + yOffset) * width)) * 4;
							localDeltaThreshold = this._colorDelta(colorIndex, dataIndexSrc);

							dataIndexDst = ((x + areaDst.x + xOffset) + ((y + areaDst.y + yOffset) * width)) * 4;
							delta = this._colorDelta(colorIndex, dataIndexDst);

							if ((Math.abs(delta - localDeltaThreshold) < deltaThreshold) &&
								(localDeltaThreshold > deltaThreshold)) {
								return true;
							}
						}
					}
				}
			}

			return false;
		},


		/**
		 * Calculates the lower limit
		 *
		 * @method _calculateLowerLimit
		 * @param {int} value
		 * @param {int} min
		 * @param {int} shift
		 * @return {int}
		 * @private
		 */
		_calculateLowerLimit: function (value, min, shift) {
			return (value - shift) < min ? -(shift + (value - shift)) : -shift;
		},

		/**
		 * Calculates the upper limit
		 *
		 * @method _calculateUpperLimit
		 * @param {int} value
		 * @param {int} max
		 * @param {int} shift
		 * @return {int}
		 * @private
		 */
		_calculateUpperLimit: function (value, max, shift) {
			return (value + shift) > max ? (max - value) : shift;
		}
	}
);

module.exports = PixelComparator;
