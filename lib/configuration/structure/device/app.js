// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../../base');

/**
 * @class App
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {string} _codeName
 * @property {string} _name
 * @property {string} _version
 * @property {string} _buildId
 */
var App = Base.extend(

	/**
	 * App constructor
	 *
	 * @param {object} options
	 * @param {string} options.codeName
	 * @param {string} options.name
	 * @param {string} options.version
	 * @param {string} options.buildId
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setCodeName(options.codeName);
		this.setName(options.name);
		this.setVersion(options.version);
		this.setBuildId(options.buildId);
	},

	{
		/**
		 * Gets the code-name
		 *
		 * @method getCodeName
		 * @return {string}
		 */
		getCodeName: function () {
			return this._codeName;
		},

		/**
		 * Sets the code-name
		 *
		 * @method setCodeName
		 * @param {string} value
		 */
		setCodeName: function (value) {
			this._codeName = value;
		},


		/**
		 * Gets the name
		 *
		 * @method getName
		 * @return {string}
		 */
		getName: function () {
			return this._name;
		},

		/**
		 * Sets the name
		 *
		 * @method setName
		 * @param {string} value
		 */
		setName: function (value) {
			this._name = value;
		},


		/**
		 * Gets the version
		 *
		 * @method getVersion
		 * @return {string}
		 */
		getVersion: function () {
			return this._version;
		},

		/**
		 * Sets the version
		 *
		 * @method setVersion
		 * @param {string} value
		 */
		setVersion: function (value) {
			this._version = value;
		},


		/**
		 * Gets the build-id
		 *
		 * @method getBuildId
		 * @return {string}
		 */
		getBuildId: function () {
			return this._buildId;
		},

		/**
		 * Sets the build-id
		 *
		 * @method setBuildId
		 * @param {string} value
		 */
		setBuildId: function (value) {
			this._buildId = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_DEVICE_APP'
	}
);

module.exports = App;
