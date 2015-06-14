// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');

var Rect = require('../atoms/rect');

/**
 * @class DomElement
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {string} _id
 * @property {DomElement} _parent
 * @property {string} _tagName
 * @property {string[]} _classes
 * @property {Rect} _rect
 * @property {DomElement[]} _nodes
 */
var DomElement = Base.extend(

	/**
	 * Dom-Element constructor
	 *
	 * @param {object} options
	 * @param {string} options.id
	 * @param {DomElement} options.parent
	 * @param {string} options.tagName
	 * @param {string[]} options.classes
	 * @param {object|Rect} options.rect
	 * @param {object[]|DomElement[]} options.nodes
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setId(options.id);
		this.setTagName(options.tagName);
		this.setClasses(options.classes);
		this.setRect(options.rect);
		this.setNodes(options.nodes);
	},

	{
		/**
		 * Gets the id of the dom-element
		 *
		 * @method getId
		 * @return {string}
		 */
		getId: function () {
			return this._id;
		},

		/**
		 * Sets the id of the dom-element
		 *
		 * @method setId
		 * @param {string} value
		 */
		setId: function (value) {
			this._id = value;
		},


		/**
		 * Gets the parent of this DOM-element
		 *
		 * @method getParent
		 * @return {DomElement}
		 */
		getParent: function () {
			return this._parent;
		},

		/**
		 * Sets the parent of this DOM-element
		 *
		 * @method setParent
		 * @param {DomElement} value
		 */
		setParent: function (value) {
			this._parent = value;
		},

		/**
		 * Does this DOM-element have a parent?
		 *
		 * @return {boolean}
		 */
		hasParent: function () {
			return !!this.getParent();
		},


		/**
		 * Gets the tag-name of the dom-element
		 *
		 * @method getTagName
		 * @return {string}
		 */
		getTagName: function () {
			return this._tagName;
		},

		/**
		 * Sets the tag-name of the dom-element
		 *
		 * @method setTagName
		 * @param {string} value
		 */
		setTagName: function (value) {
			this._tagName = value;
		},


		/**
		 * Gets the classes of the dom-element
		 *
		 * @method getClasses
		 * @return {string[]}
		 */
		getClasses: function () {
			return this._classes;
		},

		/**
		 * Sets the classes of the dom-element
		 *
		 * @method setClasses
		 * @param {string[]} value
		 */
		setClasses: function (value) {
			this._classes = value;
		},


		/**
		 * Gets the position and dimension of the dom-element
		 *
		 * @method getRect
		 * @return {Rect}
		 */
		getRect: function () {
			return this._rect;
		},

		/**
		 * Sets the position and dimension of the dom-element
		 *
		 * @method setRect
		 * @param {object|Rect} value
		 */
		setRect: function (value) {
			this._rect = this._parseObject(value, Rect, 'rect');
		},


		/**
		 * Gets the nodes of the dom-element
		 *
		 * @method getNodes
		 * @return {DomElement[]}
		 */
		getNodes: function () {
			return this._nodes;
		},

		/**
		 * Sets the nodes of the dom-element
		 *
		 * @method setNodes
		 * @param {object|DomElement[]} value
		 */
		setNodes: function (value) {

			var list = [];

			value.forEach(function (node) {
				node.parent = this;
				list.push(this._parseObject(node, DomElement, 'dom-element'));
			}.bind(this));

			this._nodes = list;
		},


		/**
		 * Gets the selector for this DOM-element
		 *
		 * @param {string} [suffix]
		 * @return {string}
		 */
		getSelector: function (suffix) {

			var id = this.getId(),
				tagName = this.getTagName(),
				classes = this.getClasses(),
				result;

			if (id) {
				return '#' + id + ' ' + suffix;

			} else if (classes && classes.length > 0) {
				result = '.' + classes.join('.') + ' ' + suffix;

				if (tagName) {
					result = tagName + result;
				}

			} else {
				result = tagName + ' ' + suffix;
			}

			if (this.hasParent()) {
				return this.getParent().getSelector(result);
			} else {
				return result;
			}
		},

		/**
		 * Finds a DOM-element at an absolute coordinate
		 *
		 * @method findElementAt
		 * @param {int} x X-coordinate
		 * @param {int} y Y-coordinate
		 */
		findElementAt: function (x, y) {

			var nodes,
				result,
				i;

			if (this.getRect().inBounds(x, y)) {
				return this;

			} else {
				nodes = this.getNodes();

				if (nodes) {

					// Travers from the back so that overlapping elements will be selected first
					for (i = nodes.length; i >= 0; i--) {
						result = nodes[i].findElementAt(x, y);

						if (result) {
							return result;
						}
					}
				}

				return null;
			}
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE_DOM_ELEMENT'
	}
);

module.exports = DomElement;
