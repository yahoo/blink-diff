// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../../base');

/**
 * @class Identity
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {string} _name
 * @property {string} _sub
 */
var Identity = Base.extend(

	/**
	 * Identity constructor
	 *
	 * @param {object} options
	 * @param {string} options.name
	 * @param {string} options.sub
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setName(options.name);
		this.setSub(options.sub);
	},

	{
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
		 * Gets the sub
		 *
		 * @method getSub
		 * @return {string}
		 */
		getSub: function () {
			return this._sub;
		},

		/**
		 * Sets the sub
		 *
		 * @method setSub
		 * @param {string} value
		 */
		setSub: function (value) {
			this._sub = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_DEVICE_IDENTITY'
	}
);

module.exports = Identity;
