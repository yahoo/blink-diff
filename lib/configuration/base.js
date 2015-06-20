// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var CoreBase = require('preceptor-core').Base;

/**
 * @class Base
 * @extends CoreBase
 * @module Configuration
 */
var Base = CoreBase.extend(

	/**
	 * Base constructor
	 *
	 * @constructor
	 * @param {object} options
	 */
	function (options) {
		this._blinkDiff = options.blinkDiff;
	},

	{
		/**
		 * Logs events to the blink-diff instance
		 *
		 * @method log
		 * @param {string} text
		 */
		log: function (text) {
			if (this._blinkDiff) {
				this._blinkDiff.log(this.constructor.TYPE + ': ' + text);
			}
		},

		/**
		 * Parses object information
		 *
		 * @method _parseObject
		 * @param {object|Image} value
		 * @param {object} Constr Constructor of data-type
		 * @param {string} typeStr Textual type description of object
		 * @return {object}
		 * @private
		 */
		_parseObject: function (value, Constr, typeStr) {

			if (typeof value == 'object' && !(value instanceof Constr)) {
				value.blinkDiff = this._blinkDiff;
				value = new Constr(value);
			}

			if (value instanceof Constr) {
				return value;
			} else {
				throw new Error('Unknown ' + typeStr + ' descriptor.');
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_BASE'
	}
);

module.exports = Base;
