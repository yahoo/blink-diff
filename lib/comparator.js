// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

/**
 * @class Comparator
 * @extends Base
 * @module Compare
 *
 * @property {Config} _config
 * @property {PixelComparison} _pixelConfig
 */
var Comparator = Base.extend(

	function (config, pixelConfig) {
		this._config = config;
		this._pixelConfig = pixelConfig;
	},

	{
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
		 * Gets the pixel comparison configuration
		 *
		 * @method getPixelConfig
		 * @return {PixelComparison}
		 */
		getPixelConfig: function () {
			return this._pixelConfig;
		},


		/**
		 * Calculates the distance of colors in the 4 dimensional color space
		 *
		 * @method _colorDelta
		 * @param {number[]} color1 Values for color 1
		 * @param {number[]} color2 Values for color 2
		 * @return {number} Distance
		 * @private
		 */
		_colorDelta: function (image1, offset1, image2, offset2) {
			return Math.pow(image1[offset1] - image2[offset2], 2) +
				Math.pow(image1[offset1 + 1] - image2[offset2 + 1], 2) +
				Math.pow(image1[offset1 + 2] - image2[offset2 + 2], 2) +
				Math.pow(image1[offset1 + 3] - image2[offset2 + 3], 2);
		},

		pixelCompare: function (imageA, imageB, output) {
			var difference = 0, i, x, y, delta, color1, color2,
				deltaThreshold = this.getPixelConfig().getColorDeltaSquared(),
				width = imageA.getWidth(),
				height = imageA.getHeight(),
				dataA = imageA.getData(),
				dataB = imageB.getData();

			for (x = 0; x < width; x++) {
				for (y = 0; y < height; y++) {
					i = (x * 4) + (y * width);

					color1 = dataA[i];
					color2 = dataB[i];

					delta = this._colorDelta(color1, color2);

					if (delta > deltaThreshold) {

						if (this._shiftCompare(x, y, color1, imageA, imageB) && this._shiftCompare(x, y, color2, imageB, imageA)) {
							output[y][x] = outputShiftColor;
						} else {
							difference++;
							output[y][x] = outputMaskColor;
						}

					} else {
						output[y][x] = backgroundColor;
					}
				}
			}

			return difference;
		},

		_shiftCompare: function (x, y, color, imageSrc, imageDst) {

			var xOffset, xLow, xHigh, yOffset, yLow, yHigh,
				delta, localDeltaThreshold,
				color1, color2,

				deltaThreshold = this.getPixelConfig().getColorDeltaSquared(),
				hShift = this.getPixelConfig().getShift().getHorizontal(),
				vShift = this.getPixelConfig().getShift().getVertical(),

				width = imageSrc.getWidth(),
				height = imageSrc.getHeight(),
				dataSrc = imageSrc.getData(),
				dataDst = imageDst.getData();

			if ((hShift > 0) || (vShift > 0)) {

				xLow = this._calculateLowerLimit(x, 0, hShift);
				xHigh = this._calculateUpperLimit(x, width - 1, hShift);

				yLow = this._calculateLowerLimit(y, 0, vShift);
				yHigh = this._calculateUpperLimit(y, height - 1, vShift);

				for (xOffset = xLow; xOffset <= xHigh; xOffset++) {
					for (yOffset = yLow; yOffset <= yHigh; yOffset++) {

						if ((xOffset != 0) || (yOffset != 0)) {

							color1 = dataSrc[y + yOffset][x + xOffset];
							localDeltaThreshold = this._colorDelta(color, color1);

							color2 = dataDst[y + yOffset][x + xOffset];
							delta = this._colorDelta(color, color2);

							if ((Math.abs(delta - localDeltaThreshold) < deltaThreshold) && (localDeltaThreshold > deltaThreshold)) {
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
