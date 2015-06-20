// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('./base');
var utils = require('preceptor-core').utils;

var Color = require('./atoms/color');
var Rect = require('./atoms/rect');
var Shift = require('./shift');
var BlockOut = require('./blockOut');

/**
 * @class StructureComparison
 * @extends Base
 * @module Configuration
 *
 * @property {string} _type
 * @property {string} _selector
 * @property {Anchor[]} _anchors
 * @property {Limit[]} _limits
 */
var StructureComparison = Base.extend(

	/**
	 * Structural comparison constructor
	 *
	 * @param {object} options
	 * @param {string} options.type Type of comparison
	 * @param {string} options.selector Selector for checked DOM-element
	 * @param {object[]|Anchor[]} options.anchors Anchors for DOM-element
	 * @param {object[]|Limit[]} options.limits Limits for selecting DOM-elements
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			type: "structure",
			selector: null,
			anchors: [],
			limits: []
		}, [options]);

		this.setType(options.type);
		this.setSelector(options.selector);

		this.setAnchors(options.anchors);
		this.setLimits(options.limits);
	},

	{
		/**
		 * Gets the comparison type
		 *
		 * @method getType
		 * @return {string}
		 */
		getType: function () {
			return this._type;
		},

		/**
		 * Sets the comparison type
		 *
		 * @method setType
		 * @param {string} value
		 */
		setType: function (value) {
			this._type = value;
		},


		/**
		 * Gets the selector for a DOM element
		 *
		 * @method getSelector
		 * @return {string}
		 */
		getSelector: function () {
			return this._selector;
		},

		/**
		 * Sets the selector for a DOM element
		 *
		 * @method setSelector
		 * @param {string} value
		 */
		setSelector: function (value) {
			this._selector = value;
		},


		/**
		 * Gets the anchors for DOM-elements
		 *
		 * @method getAnchors
		 * @return {Anchor[]}
		 */
		getAnchors: function () {
			return this._anchors;
		},

		/**
		 * Sets the anchors for DOM-elements
		 *
		 * @method setAnchors
		 * @param {object[]|Anchor[]} value
		 */
		setAnchors: function (value) {

			var list = [];

			value.forEach(function (entry) {
				list.push(this._parseObject(entry, Anchor, 'anchor'));
			}.bind(this));

			this._anchors = list;
		},


		/**
		 * Gets the limitations for selection
		 *
		 * @method getLimits
		 * @return {Limit[]}
		 */
		getLimits: function () {
			return this._limits;
		},

		/**
		 * Sets the limitations or selection
		 *
		 * @method setLimits
		 * @param {object[]|Limit[]} value
		 */
		setLimits: function (value) {

			var list = [];

			value.forEach(function (entry) {
				list.push(this._parseObject(entry, Limit, 'limit'));
			}.bind(this));

			this._limits = list;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_COMPARISON'
	}
);

module.exports = StructureComparison;
