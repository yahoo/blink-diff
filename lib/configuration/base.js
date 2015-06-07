// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var CoreBase = require('preceptor-core').Base;

/**
 * @class Base
 * @extends CoreBase
 * @module Configuration
 */
var Base = CoreBase.extend(

	{
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

			if (typeof value == 'object' && !value instanceof Constr) {
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
