// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');

var Rect = require('../atoms/rect');

/**
 * @class Screenshot
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {boolean} _stitched
 * @property {Rect} _section
 */
var Screenshot = Base.extend(

	/**
	 * Screenshot constructor
	 *
	 * @param {object} options
	 * @param {boolean} options.stitched
	 * @param {object|Rect} options.section
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setStitched(options.stitched);
		this.setSection(options.section);
	},

	{
		/**
		 * Is screenshot stitched?
		 *
		 * @method isStitched
		 * @return {boolean}
		 */
		isStitched: function () {
			return this._stitched;
		},

		/**
		 * Sets if the screenshot was stitched
		 *
		 * @method setStitched
		 * @param {boolean} value
		 */
		setStitched: function (value) {
			this._stitched = value;
		},


		/**
		 * Gets the section of the complete screenshot that is represented by the image-data
		 *
		 * @method getSection
		 * @return {Rect}
		 */
		getSection: function () {
			return this._section;
		},

		/**
		 * Sets the section of the complete screenshot that is represented by the image-data
		 *
		 * @method setSection
		 * @param {object|Rect} value
		 */
		setSection: function (value) {
			this._section = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_SCREENSHOT'
	}
);

module.exports = Screenshot;
