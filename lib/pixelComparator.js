// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

/**
 * @class PixelComparator
 * @extends Base
 * @module Compare
 *
 * @property {PixelComparison} _comparison
 */
var PixelComparator = Base.extend(

	function (imageA, imageB, comparison) {
		this._imageA = imageA;
		this._imageB = imageB;
		this._comparison = comparison;
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
		 * Gets the pixel comparison configuration
		 *
		 * @method getPixelConfig
		 * @return {PixelComparison}
		 */
		getComparison: function () {
			return this._comparison;
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
			return Math.pow(this._imageA[offsetA] - this._imageB[offsetB], 2) +
				Math.pow(this._imageA[offsetA + 1] - this._imageB[offsetB + 1], 2) +
				Math.pow(this._imageA[offsetA + 2] - this._imageB[offsetB + 2], 2) +
				Math.pow(this._imageA[offsetA + 3] - this._imageB[offsetB + 3], 2);
		},

		compare: function (flagField) {

			var flagFieldIndex, dataIndex, x, y, delta, color1, color2,
				comparison = this.getComparison(),
				area = comparison.getAreaImageA()
				deltaThreshold = comparison.getColorDeltaSquared(),
				width = this._imageA.getWidth(),
				height = this._imageA.getHeight(),
				dataA = this._imageA.getData(),
				dataB = this._imageB.getData();

			for (x = 0; x < width; x++) {
				for (y = 0; y < height; y++) {

					flagFieldIndex = x + (y * width);
					dataIndex = 4 * flagFieldIndex;

					color1 = dataA[dataIndex];
					color2 = dataB[dataIndex];

					delta = this._colorDelta(color1, color2);

					if (delta > deltaThreshold) {

						if (this._shiftCompare(x, y, color1, this._imageA, this._imageB) &&
							this._shiftCompare(x, y, color2, this._imageB, this._imageA)) {

							flagField[flagFieldIndex] = flagField[flagFieldIndex] | 2;
						} else {
							flagField[flagFieldIndex] = flagField[flagFieldIndex] | 1;
						}
					}
				}
			}
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
