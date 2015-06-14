// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');

/**
 * @class Version
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {int} _major
 * @property {int} _minor
 */
var Version = Base.extend(

	/**
	 * Version constructor
	 *
	 * @param {object} options
	 * @param {int} options.major
	 * @param {int} options.minor
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setMajor(options.major);
		this.setMinor(options.minor);
	},

	{
		/**
		 * Gets the major part of the version
		 *
		 * @method getMajor
		 * @return {int}
		 */
		getMajor: function () {
			return this._major;
		},

		/**
		 * Sets the major part of the version
		 *
		 * @method setMajor
		 * @param {int} value
		 */
		setMajor: function (value) {
			this._major = value;
		},


		/**
		 * Gets the minor part of the version
		 *
		 * @method getMinor
		 * @return {int}
		 */
		getMinor: function () {
			return this._minor;
		},

		/**
		 * Sets the minor part of the version
		 *
		 * @method setMinor
		 * @param {int} value
		 */
		setMinor: function (value) {
			this._minor = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_VERSION'
	}
);

module.exports = Version;
