// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

/**
 * @class Shift
 * @extends Base
 * @module Configuration
 *
 * @property {boolean} _active
 * @property {int} _horizontal
 * @property {int} _vertical
 * @property {boolean} _visible
 */
var Shift = Base.extend(

	/**
	 * Shift constructor
	 *
	 * @param {object} options
	 * @param {boolean} options.active Shift activated?
	 * @param {int} options.horizontal Max. horizontal shift
	 * @param {int} options.vertical Max. vertical shift
	 * @param {boolean} options.visible Visible
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			active: true,
			horizontal: 2,
			vertical: 2,
			visible: true
		}, [options]);

		if (options.active) {
			this.activate();
		} else {
			this.deactivate();
		}

		this.setHorizontal(options.horizontal);
		this.setVertical(options.vertical);

		this.setVisibility(options.visible);
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
		},


		/**
		 * Is shift visible in final result
		 *
		 * @method isVisible
		 * @return {boolean}
		 */
		isVisible: function () {
			return this._visible;
		},

		/**
		 * Sets the visibility of the shift in final result
		 *
		 * @method setVisibility
		 * @param {boolean} value
		 */
		setVisibility: function (value) {
			this._visible = !!value;
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
