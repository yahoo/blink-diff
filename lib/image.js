// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;
var PNGImage = require('pngjs-image');

/**
 * @class Image
 * @extends Base
 * @module Compare
 *
 * @property {PNGImage} _image
 * @property {number[]} _refWhite
 * @property {boolean} _gammaCorrection
 * @property {boolean} _perceptual
 * @property {boolean} _filters
 */
var Image = Base.extend(

	/**
	 * Image constructor
	 *
	 * @param {object} options
	 * @param {PNGImage} options.image Image
	 * @constructor
	 */
	function (options) {
		this.__super();

		this._image = options.image;

		this._refWhite = [];
		this._convertRgbToXyz([1, 1, 1, 1], 0, this._refWhite);

		this._gammaCorrection = false;
		this._perceptual = false;
		this._filters = false;
	},

	{
		/**
		 * Gets the image
		 *
		 * @method getImage
		 * @return {PNGImage}
		 */
		getImage: function () {
			return this._image;
		},

		/**
		 * Gets the image data
		 *
		 * @method getData
		 * @return {Buffer}
		 */
		getData: function () {
			return this.getImage()._data;
		},


		/**
		 * Gets the width of the image
		 *
		 * @method getWidth
		 * @return {int}
		 */
		getWidth: function () {
			return this.getImage().getWidth();
		},

		/**
		 * Gets the height of the image
		 *
		 * @method getHeight
		 * @return {int}
		 */
		getHeight: function () {
			return this.getImage().getHeight();
		},

		/**
		 * Gets the length of bytes of the image
		 *
		 * @method getLength
		 * @return {int}
		 */
		getLength: function () {
			return this.getWidth() * this.getHeight() * 4;
		},


		/**
		 * Determines if gamma-correction has been applied
		 *
		 * @method hasGammaCorrection
		 * @return {boolean}
		 */
		hasGammaCorrection: function () {
			return this._gammaCorrection;
		},

		/**
		 * Is image converted to a perceptual image?
		 *
		 * @method isPerceptual
		 * @return {boolean}
		 */
		isPerceptual: function () {
			return this._perceptual;
		},

		/**
		 * Has applied filters
		 *
		 * @method hasFilters
		 * @return {boolean}
		 */
		hasFilters: function () {
			return this._filters;
		},


		/**
		 * Applies gamma correction on the image
		 *
		 * @method applyGamma
		 * @param {Color} gamma
		 */
		applyGamma: function (gamma) {

			var i, len,
				image,
				localGamma;

			if (!this._perceptual) {

				len = this.getLength();
				image = this.getData();
				localGamma = gamma.getColor();

				for (i = 0; i < len; i += 4) {
					image[i] = Math.pow(image[i], 1 / localGamma.red);
					image[i + 1] = Math.pow(image[i + 1], 1 / localGamma.green);
					image[i + 2] = Math.pow(image[i + 2], 1 / localGamma.blue);
				}

				this._gammaCorrection = true;
			}
		},


		/**
		 * Converts the image to a perceptual color-space
		 *
		 * @method convertToPerceptual
		 */
		convertToPerceptual: function () {

			var i, len,
				data,
				pixelList,
				bounds;

			if (!this._perceptual) {

				len = this.getLength();
				data = this.getData();
				pixelList = [];

				bounds = [
					{min: 20000000, max: -20000000},
					{min: 20000000, max: -20000000},
					{min: 20000000, max: -20000000}
				];

				for (i = 0; i < len; i += 4) {
					this._convertRgbToXyz(data, i, pixelList);
					this._convertXyzToCieLab(data, i, pixelList);

					bounds[0].min = Math.min(bounds[0].min, pixelList[i]);
					bounds[1].min = Math.min(bounds[1].min, pixelList[i + 1]);
					bounds[2].min = Math.min(bounds[2].min, pixelList[i + 2]);

					bounds[0].max = Math.max(bounds[0].max, pixelList[i]);
					bounds[1].max = Math.max(bounds[1].max, pixelList[i + 1]);
					bounds[2].max = Math.max(bounds[2].max, pixelList[i + 2]);
				}

				for (i = 0; i < len; i += 4) {
					data[i] = 255 * ((pixelList[i] - bounds[0].min) / bounds[0].max);
					data[i + 1] = 255 * ((pixelList[i + 1] - bounds[1].min) / bounds[1].max);
					data[i + 2] = 255 * ((pixelList[i + 2] - bounds[2].min) / bounds[2].max);
				}

				this._perceptual = true;
			}
		},

		/**
		 * Converts the color from RGB to XYZ
		 *
		 * @method _convertRgbToXyz
		 * @param {Buffer} buffer
		 * @param {int} offset
		 * @param {int[]} output
		 * @private
		 */
		_convertRgbToXyz: function (buffer, offset, output) {

			var result = [
				buffer[offset] * 0.4887180 + buffer[offset + 1] * 0.3106803 + buffer[offset + 2] * 0.2006017,
				buffer[offset] * 0.1762044 + buffer[offset + 1] * 0.8129847 + buffer[offset + 2] * 0.0108109,
				buffer[offset + 1] * 0.0102048 + buffer[offset + 2] * 0.9897952,
				buffer[offset + 3]
			];

			output[offset] = result[0];
			output[offset + 1] = result[1];
			output[offset + 2] = result[2];
			output[offset + 3] = result[3];
		},

		/**
		 * Converts the color from Xyz to CieLab
		 *
		 * @method _convertXyzToCieLab
		 * @param {Buffer} buffer
		 * @param {int} offset
		 * @param {int[]} output
		 * @private
		 */
		_convertXyzToCieLab: function (buffer, offset, output) {

			var c1, c2, c3;

			function f (t) {
				return (t > 0.00885645167904) ? Math.pow(t, 1 / 3) : 70.08333333333263 * t + 0.13793103448276;
			}

			c1 = f(buffer[offset] / this._refWhite[0]);
			c2 = f(buffer[offset + 1] / this._refWhite[1]);
			c3 = f(buffer[offset + 2] / this._refWhite[2]);

			output[offset] = (116 * c2) - 16;
			output[offset + 1] = 500 * (c1 - c2);
			output[offset + 2] = 200 * (c2 - c3);
			output[offset + 3] = buffer[offset + 3];
		},


		/**
		 * Applies a list of filters
		 *
		 * @method applyFilters
		 * @param {string[]} filters
		 */
		applyFilters: function (filters) {
			if (!this._filters) {
				this.getImage().applyFilters(filters);
				this._filters = true;
			}
		},


		/**
		 * Processes image for the comparison configuration
		 *
		 * @method processImage
		 * @param {PixelComparison|StructureComparison} comparison
		 */
		processImage: function (comparison) {

			if (comparison.hasGamma && comparison.hasGamma()) {
				this.applyGamma(comparison.getGamma())
			}
			if (comparison.isPerceptual && comparison.isPerceptual()) {
				this.convertToPerceptual();
			}

			if (comparison.getFilters) {
				this.applyFilters(comparison.getFilters());
			}

			if (comparison.getBlockOuts) { // Important - do this after filtering
				comparison.getBlockOuts().forEach(function (blockOut) {
					this._image = blockOut.processImage(this.getImage());
				}.bind(this));
			}

			return this.getImage();
		}
	},

	/**
	 * @lends Image
	 */
	{
		/**
		 * Processes an image with comparison configuration
		 *
		 * @param {PNGImage} image
		 * @param {PixelComparison|StructureComparison} comparison
		 * @return {PNGImage}
		 */
		processImage: function (image, comparison) {

			var obj = new Image({
				image: image
			});

			obj.processImage(comparison);

			return obj.getImage();
		}
	}
);

module.exports = Image;
