// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');
var utils = require('preceptor-core').utils;

/**
 * @class Color
 * @extends Base
 * @module Configuration
 * @submodule Atoms
 *
 * @property {number} _red
 * @property {number} _green
 * @property {number} _blue
 * @property {number} _alpha
 * @property {float} _opacity
 */
var Color = Base.extend(

	/**
	 * Color constructor
	 *
	 * @param {object} options
	 * @param {number} options.red Red channel
	 * @param {number} options.green Green channel
	 * @param {number} options.blue Blue channel
	 * @param {number} options.alpha Alpha Channel
	 * @param {float} options.opacity Opacity of color
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			red: 0,
			green: 0,
			blue: 0,
			alpha: 255,
			opacity: 1.0
		}, [options]);

		this.setRed(options.red);
		this.setGreen(options.green);
		this.setBlue(options.blue);
		this.setAlpha(options.alpha);
		this.setOpacity(options.opacity);
	},

	{
		/**
		 * Gets the red channel
		 *
		 * @method getRed
		 * @return {number}
		 */
		getRed: function () {
			return this._red;
		},

		/**
		 * Sets the red channel
		 *
		 * @method setRed
		 * @param {number} value
		 */
		setRed: function (value) {
			this._red = value;
		},


		/**
		 * Gets the green channel
		 *
		 * @method getGreen
		 * @return {number}
		 */
		getGreen: function () {
			return this._green;
		},

		/**
		 * Sets the green channel
		 *
		 * @method setGreen
		 * @param {number} value
		 */
		setGreen: function (value) {
			this._green = value;
		},


		/**
		 * Gets the blue channel
		 *
		 * @method getBlue
		 * @return {number}
		 */
		getBlue: function () {
			return this._blue;
		},

		/**
		 * Sets the blue channel
		 *
		 * @method setBlue
		 * @param {number} value
		 */
		setBlue: function (value) {
			this._blue = value;
		},


		/**
		 * Gets the alpha channel
		 *
		 * @method getAlpha
		 * @return {number}
		 */
		getAlpha: function () {
			return this._alpha;
		},

		/**
		 * Sets the alpha channel
		 *
		 * @method setAlpha
		 * @param {number} value
		 */
		setAlpha: function (value) {
			this._alpha = value;
		},


		/**
		 * Gets the opacity of the color
		 *
		 * @method getOpacity
		 * @return {float}
		 */
		getOpacity: function () {
			return this._opacity;
		},

		/**
		 * Sets the opacity of the color
		 *
		 * @method setOpacity
		 * @param {float} value
		 */
		setOpacity: function (value) {
			this._opacity = value;
		},


		/**
		 * Gets all color channels as one color object
		 *
		 * @method getColor
		 * @param {boolean} [alpha=false] Output alpha channel?
		 * @param {boolean} [opacity=false] Output opacity?
		 * @return {{red: (number), green: (number), blue: (number)[, alpha: (number)][, opacity: (float)]}}
		 */
		getColor: function (alpha, opacity) {

			var result = {
				red: this.getRed(),
				green: this.getGreen(),
				blue: this.getBlue()
			};

			if (alpha) {
				result.alpha = this.getAlpha();
			}

			if (opacity) {
				result.opacity = this.getOpacity();
			}

			return result;
		},

		/**
		 * Gets all color channels as one color object with short descriptions
		 *
		 * @method getShortColor
		 * @param {boolean} [alpha=false] Output alpha channel?
		 * @param {boolean} [opacity=false] Output opacity?
		 * @return {{r: (number), g: (number), b: (number)[, a: (number)][, o: (float)]}}
		 */
		getShortColor: function (alpha, opacity) {

			var result = {
				r: this.getRed(),
				g: this.getGreen(),
				b: this.getBlue()
			};


			if (alpha) {
				result.a = this.getAlpha();
			}

			if (opacity) {
				result.o = this.getOpacity();
			}

			return result;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_ATOM_COLOR'
	}
);

module.exports = Color;
