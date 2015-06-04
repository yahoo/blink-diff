// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;
var PNGImage = require('pngjs-image');

/**
 * @class Image
 * @extends Base
 * @module Compare
 *
 * @property {number[][]} _image
 * @property {int} _width
 * @property {int} _height
 * @property {number[]} _refWhite
 * @property {boolean} _gammaCorrection
 * @property {boolean} _perceptual
 */
var Image = Base.extend(

	/**
	 * Image constructor
	 *
	 * @param {object} options
	 * @param {string|PNGImage} options.image Image
	 * @constructor
	 */
	function (options) {
		this.__super();

		this._loadImage(options.image);

		this._refWhite = this._convertRgbToXyz([1, 1, 1, 1]);
		this._gammaCorrection = false;
		this._perceptual = false;
	},

	{
		/**
		 * Loads an image and converts it into an int-array
		 *
		 * @param {PNGImage} image
		 * @private
		 */
		_loadImage: function (image) {

			var data = image.data,
				width = image.getWidth(),
				height = image.getHeight(),
				row,
				i = 0,
				resultImage = [];

			for(var y = 0; y < height; y++) {

				row = [];
				for(var x = 0; x < width; x++) {
					row.push([data[i], data[i + 1], data[i + 2], data[i + 3]]);
					i += 4;
				}

				resultImage.push(row);
			}

			this._image = resultImage;
			this._width = width;
			this._height = height;
		},


		/**
		 * Gets the image data
		 *
		 * @method getData
		 * @return {number[][]}
		 */
		getData: function () {
			return this._image;
		},


		/**
		 * Gets the width of the image
		 *
		 * @method getWidth
		 * @return {int}
		 */
		getWidth: function () {
			return this._width;
		},

		/**
		 * Gets the height of the image
		 *
		 * @method getHeight
		 * @return {int}
		 */
		getHeight: function () {
			return this._height;
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
		 * Applies gamma correction on the image
		 *
		 * @method applyGamma
		 * @param {Color} gamma
		 */
		applyGamma: function (gamma) {

			var width = this.getWidth(),
				height = this.getHeight(),
				image = this.getData(),
				localGamma = gamma.getColor();

			for(var y = 0; y < height; y++) {
				for(var x = 0; x < width; x++) {
					image[y][x][0] = Math.pow(image[y][x][0], 1 / localGamma.red);
					image[y][x][1] = Math.pow(image[y][x][1], 1 / localGamma.green);
					image[y][x][2] = Math.pow(image[y][x][2], 1 / localGamma.blue);
				}
			}

			this._gammaCorrection = true;
		},

		/**
		 * Converts the image to a perceptual color-space
		 *
		 * @method convertToPerceptual
		 */
		convertToPerceptual: function () {

			var width = this.getWidth(),
				height = this.getHeight(),
				image = this.getData(),
				bounds,
				x, y;

			bounds = [
				{ min:20000, max: -20000 },
				{ min:20000, max: -20000 },
				{ min:20000, max: -20000 }
			];

			for(y = 0; y < height; y++) {
				for(x = 0; x < width; x++) {
					image[y][x] = this._convertXyzToCieLab(this._convertRgbToXyz(image[y][x]));

					bounds[0].min = Math.min(bounds[0].min, image[y][x][0]);
					bounds[1].min = Math.min(bounds[1].min, image[y][x][1]);
					bounds[2].min = Math.min(bounds[2].min, image[y][x][2]);

					bounds[0].max = Math.max(bounds[0].max, image[y][x][0]);
					bounds[1].max = Math.max(bounds[1].max, image[y][x][1]);
					bounds[2].max = Math.max(bounds[2].max, image[y][x][2]);
				}
			}

			for(y = 0; y < height; y++) {
				for(x = 0; x < width; x++) {
					image[y][x][0] = 255 * ((image[y][x][0] - bounds[0].min) / bounds[0].max);
					image[y][x][1] = 255 * ((image[y][x][1] - bounds[1].min) / bounds[1].max);
					image[y][x][2] = 255 * ((image[y][x][2] - bounds[2].min) / bounds[2].max);
				}
			}

			this._perceptual = true;
		},

		/**
		 * Converts the color from RGB to XYZ
		 *
		 * @method _convertRgbToXyz
		 * @param {object} color
		 * @return {object}
		 * @private
		 */
		_convertRgbToXyz: function (color) {

			var result = [];

			result[0] = color[0] * 0.4887180 + color[1] * 0.3106803 + color[2] * 0.2006017;
			result[1] = color[0] * 0.1762044 + color[1] * 0.8129847 + color[2] * 0.0108109;
			result[2] = color[1] * 0.0102048 + color[2] * 0.9897952;
			result[3] = color[3];

			return result;
		},

		/**
		 * Converts the color from Xyz to CieLab
		 *
		 * @method _convertXyzToCieLab
		 * @param {number[]} color
		 * @return {number[]}
		 * @private
		 */
		_convertXyzToCieLab: function (color) {

			var result = [],
				c1, c2, c3;

			function f (t) {
				return (t > 0.00885645167904) ? Math.pow(t, 1 / 3) : 70.08333333333263 * t + 0.13793103448276;
			}

			c1 = f(color[0] / this._refWhite[0]);
			c2 = f(color[1] / this._refWhite[1]);
			c3 = f(color[2] / this._refWhite[2]);

			result[0] = (116 * c2) - 16;
			result[1] = 500 * (c1 - c2);
			result[2] = 200 * (c2 - c3);
			result[3] = color[3];

			return result;
		},


		/**
		 * Converts the data to an image-object
		 *
		 * @method toImage
		 * @return {PNGImage}
		 */
		toImage: function () {

			var width = this.getWidth(),
				height = this.getHeight(),
				png = PNGImage.createImage(width, height),

				image = this.getData(),
				data = png.data,
				i = 0;

			for(var y = 0; y < height; y++) {
				for(var x = 0; x < width; x++) {

					data[i] = Math.floor(image[y][x][0]) & 0xff;
					data[i + 1] = Math.floor(image[y][x][1]) & 0xff;
					data[i + 2] = Math.floor(image[y][x][2]) & 0xff;
					data[i + 3] = Math.floor(image[y][x][3]) & 0xff;

					i += 4;
				}
			}

			return png;
		}
	}
);
