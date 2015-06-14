// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var Base = require('../base');

var Version = require('./version');
var Device = require('./device');
var Document = require('./document');
var ViewPort = require('./viewPort');
var Screenshot = require('./screenshot');
var DomElement = require('./domElement');

/**
 * @class Structure
 * @extends Base
 * @module Configuration
 * @submodule Structure
 *
 * @property {Version} _version
 * @property {Device} _device
 * @property {Document} _document
 * @property {ViewPort} _viewPort
 * @property {Screenshot} _screenshot
 * @property {DomElement} _dom
 */
var Structure = Base.extend(

	/**
	 * Structure constructor
	 *
	 * @param {object} options
	 * @param {object|Version} options.version
	 * @param {object|Device} options.device
	 * @param {object|Document} options.document
	 * @param {object|ViewPort} options.viewPort
	 * @param {object|Screenshot} options.screenshot
	 * @param {object|DomElement} options.dom
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		this.setVersion(options.version);
		this.setDevice(options.device);
		this.setDocument(options.document);
		this.setViewPort(options.viewPort);
		this.setScreenshot(options.screenshot);
		this.setDom(options.dom);
	},

	{
		/**
		 * Gets the version of the structure format
		 *
		 * @method getVersion
		 * @return {Version}
		 */
		getVersion: function () {
			return this._version;
		},

		/**
		 * Sets the version of the structure format
		 *
		 * @method setVersion
		 * @param {object|Version} value
		 */
		setVersion: function (value) {
			this._version = this._parseObject(value, Version, 'version');
		},


		/**
		 * Gets the device from where the data was recorded
		 *
		 * @method getDevice
		 * @return {Device}
		 */
		getDevice: function () {
			return this._device;
		},

		/**
		 * Sets the device from where the data was recorded
		 *
		 * @method setDevice
		 * @param {object|Device} value
		 */
		setDevice: function (value) {
			this._device = this._parseObject(value, Device, 'device');
		},


		/**
		 * Gets the document
		 *
		 * @method getDocument
		 * @return {Document}
		 */
		getDocument: function () {
			return this._document;
		},

		/**
		 * Sets the document
		 *
		 * @method setDocument
		 * @param {object|Document} value
		 */
		setDocument: function (value) {
			this._document = this._parseObject(value, Document, 'document');
		},


		/**
		 * Gets the view-port
		 *
		 * @method getViewPort
		 * @return {ViewPort}
		 */
		getViewPort: function () {
			return this._viewPort;
		},

		/**
		 * Sets the view-port
		 *
		 * @method setViewPort
		 * @param {object|ViewPort} value
		 */
		setViewPort: function (value) {
			this._viewPort = this._parseObject(value, ViewPort, 'view-port');
		},


		/**
		 * Gets the screenshot information
		 *
		 * @method getScreenshot
		 * @return {Screenshot}
		 */
		getScreenshot: function () {
			return this._screenshot;
		},

		/**
		 * Sets the screenshot information
		 *
		 * @method setScreenshot
		 * @param {object|Screenshot} value
		 */
		setScreenshot: function (value) {
			this._screenshot = this._parseObject(value, Screenshot, 'screenshot');
		},


		/**
		 * Gets the DOM
		 *
		 * @method getDom
		 * @return {DomElement}
		 */
		getDom: function () {
			return this._dom;
		},

		/**
		 * Sets the DOM
		 *
		 * @method setDom
		 * @param {object|DomElement} value
		 */
		setDom: function (value) {
			this._dom = this._parseObject(value, DomElement, 'DOM');
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_STRUCTURE'
	}
);

module.exports = Structure;
