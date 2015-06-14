// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');

/**
 * @class Shift
 * @extends Base
 * @module Configuration
 *
 * @property {boolean} _active
 * @property {int} _horizontal
 * @property {int} _vertical
 */
var Shift = Base.extend(

	/**
	 * Shift constructor
	 *
	 * @param {object} options
	 * @param {boolean} options.active Shift activated?
	 * @param {int} options.horizontal Max. horizontal shift
	 * @param {int} options.vertical Max. vertical shift
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		if (options.active) {
			this.activate();
		} else {
			this.deactivate();
		}

		this.setHorizontal(options.horizontal);
		this.setVertical(options.vertical);
	},

	{
		/**
		 * Is shifting activated?
		 *
		 * @method isActive
		 * @return {boolean}
		 */
		isActive: function () {
			return this._active;
		},

		/**
		 * Activates shift highlighting
		 *
		 * @method activate
		 */
		activate: function () {
			this._activate = true;
		},

		/**
		 * Deactivates shift highlighting
		 *
		 * @method deactivate
		 */
		deactivate: function () {
			this._active = false;
		},


		/**
		 * Gets the max. horizontal shift
		 *
		 * @method getHorizontal
		 * @return {int}
		 */
		getHorizontal: function () {
			return this._horizontal;
		},

		/**
		 * Sets the max. horizontal shift
		 *
		 * @method setHorizontal
		 * @param {int} value
		 */
		setHorizontal: function (value) {
			this._horizontal = value;
		},


		/**
		 * Gets the max. vertical shift
		 *
		 * @method getVertical
		 * @return {int}
		 */
		getVertical: function () {
			return this._vertical;
		},

		/**
		 * Sets the max. vertical shift
		 *
		 * @method setVertical
		 * @param {int} value
		 */
		setVertical: function (value) {
			this._vertical = value;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_SHIFT'
	}
);

module.exports = Shift;
