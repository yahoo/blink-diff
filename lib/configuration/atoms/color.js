// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('preceptor-core').Base;

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
		this.__super();

		this._red = options.red;
		this._green = options.green;
		this._blue = options.blue;
		this._alpha = options.alpha;
		this._opacity = options.opacity;
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
		 * Gets the green channel
		 *
		 * @method getGreen
		 * @return {number}
		 */
		getGreen: function () {
			return this._green;
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
		 * Gets the alpha channel
		 *
		 * @method getAlpha
		 * @return {number}
		 */
		getAlpha: function () {
			return this._alpha;
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
