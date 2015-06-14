// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Rect = require('../atoms/rect');

/**
 * @class ViewPort
 * @extends Rect
 * @module Configuration
 * @submodule Structure
 */
var ViewPort = Rect.extend(

	/**
	 * View-port constructor
	 *
	 * @param {object} options
	 * @constructor
	 */
	function (options) {
		this.__super(options);
	},

	{
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_VIEWPORT'
	}
);

module.exports = ViewPort;
