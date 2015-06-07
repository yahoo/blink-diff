// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Size = require('./size');

/**
 * @class Screen
 * @extends Size
 * @module Configuration
 * @submodule Structure
 *
 * @property {number} _pixelRatio
 * @property {int} _colorDepth
 * @property {boolean} _fullScreen
 */
var Screen = Size.extend(

	/**
	 * Screen constructor
	 *
	 * @param {object} options
	 * @param {number} options.pixelRatio
	 * @param {int} options.colorDepth
	 * @param {boolean} options.fullScreen
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setPixelRatio(options.pixelRatio);
		this.setColorDepth(options.colorDepth);
		this.setFullScreen(options.fullScreen);
	},

	{
		/**
		 * Gets the pixel-ratio
		 *
		 * @method getPixelRatio
		 * @return {number}
		 */
		getPixelRatio: function () {
			return this._pixelRatio;
		},

		/**
		 * Sets the pixel-ratio
		 *
		 * @method setPixelRatio
		 * @param {number} value
		 */
		setPixelRatio: function (value) {
			this._pixelRatio = value;
		},


		/**
		 * Gets the color-depth
		 *
		 * @method getColorDepth
		 * @return {int}
		 */
		getColorDepth: function () {
			return this._colorDepth;
		},

		/**
		 * Sets the color-depth
		 *
		 * @method setColorDepth
		 * @param {int} value
		 */
		setColorDepth: function (value) {
			this._colorDepth = value;
		},


		/**
		 * If the application was full-screen when the screenshot was taken
		 *
		 * @method wasFullScreen
		 * @return {boolean}
		 */
		wasFullScreen: function () {
			return this._fullScreen;
		},

		/**
		 * Sets if the application was in full-screen when the screenshot was taken
		 *
		 * @method setFullScreen
		 * @param {boolean} value
		 */
		setFullScreen: function (value) {
			this._fullScreen = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_DEVICE_SCREEN'
	}
);

module.exports = Screen;
