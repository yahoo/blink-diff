// Copyright 2015 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var fs = require('fs');

var Base = require('./base');
var PNGImage = require('pngjs-image');
var utils = require('preceptor-core').utils;

var Rect = require('./atoms/rect');
var Structure = require('./structure/structure');

/**
 * @class Image
 * @extends Base
 * @module Configuration
 *
 * @property {PNGImage} _image
 * @property {Structure} _structure
 * @property {Rect} _crop
 *
 * @property {boolean} _alreadyCropped
 * @property {PNGImage} _croppedImage
 */
var Image = Base.extend(

	/**
	 * Image constructor
	 *
	 * @param {object} options
	 * @param {string|PNGImage} options.image Image
	 * @param {object|Structure} options.structure Structure of the image as a DOM
	 * @param {object|Rect} [options.crop] Cropping of the image
	 * @constructor
	 */
	function (options) {
		this.__super(options);

		options = utils.deepExtend({
			structure: null,
			image: null,
			crop: {}
		}, [options]);

		if (options.structure) {
			this.setStructure(options.structure);
		}
		this.setImage(options.image);

		this.setCropRect(options.crop);
	},

	{
		/**
		 * Gets the image
		 *
		 * @method getImage
		 * @return {PNGImage}
		 */
		getImage: function () {
			return this._image;
		},

		/**
		 * Sets the image
		 *
		 * @method setImage
		 * @param {string|PNGImage} image
		 */
		setImage: function (image) {

			if (typeof image == 'string') {
				image = this._readImage(image);

			} else if (typeof image == 'buffer') {
				image = this._loadImage(image);
			}

			if (image instanceof PNGImage) {
				this._image = image;
				this._alreadyCropped = false;
				this._croppedImage = null;
			} else {
				throw new Error('Unknown image format.');
			}
		},

		/**
		 * Reads the image from the FS
		 *
		 * @param {string} path
		 * @return {PNGImage}
		 * @private
		 */
		_readImage: function (path) {
			this.log('Read image: ' + path);
			return this._loadImage(fs.readFileSync(path));
		},

		/**
		 * Loads the image from a buffer
		 *
		 * @param {Buffer} blob
		 * @return {PNGImage}
		 * @private
		 */
		_loadImage: function (blob) {

			var decoder,
				data,
				headerChunk,
				structureChunk,
				width, height,
				image,
				Decoder = PNGImage.Decoder;

			this.log('Load image');
			decoder = new Decoder();
			data = decoder.decode(blob, { strict: false });

			headerChunk = decoder.getHeaderChunk();
			width = headerChunk.getWidth();
			height = headerChunk.getHeight();

			// Load structure when embedded
			if (decoder.hasChunksOfType('stRT')) {
				structureChunk = decoder.getFirstChunk('stRT');

				if ((structureChunk.getDataType() == 'BLDF') &&
					(structureChunk.getMajor() == 1) &&
					(structureChunk.getMinor() == 0) &&
					structureChunk.getContent())
				{
					this.log('Found structural data');
					this.setStructure(structureChunk.getContent());
				}
			}

			image = new PNG({
				width: width,
				height: height
			});
			data.copy(image.data, 0, 0, data.length);

			return new PNGImage(image);
		},


		/**
		 * Gets the structure of the image as a DOM
		 *
		 * @method getStructure
		 * @return {Structure}
		 */
		getStructure: function () {
			return this._structure;
		},

		/**
		 * Sets the structure of the image as a DOM
		 *
		 * @method setStructure
		 * @return {object|Structure}
		 */
		setStructure: function (value) {
			this._structure = this._parseObject(value, Structure, 'structure');
		},


		/**
		 * Is image cropped?
		 *
		 * @method isCropped
		 * @return {boolean}
		 */
		isCropped: function () {
			return !!this._crop;
		},

		/**
		 * Gets the cropping rectangle
		 *
		 * @method getCropRect
		 * @return {Rect}
		 */
		getCropRect: function () {
			return this._crop;
		},

		/**
		 * Sets the cropping rectangle
		 *
		 * @method setCropRect
		 * @param {object|Rect} value
		 */
		setCropRect: function (value) {
			this._crop = this._parseObject(value, Rect, 'rect');
			this._alreadyCropped = false;
			this._croppedImage = null;
		},


		/**
		 * Gets the processed image
		 *
		 * @method getProcessedImage
		 * @return {PNGImage}
		 */
		getProcessedImage: function () {

			var rect, coord;

			if (!this.isCropped()) {
				return PNGImage.copyImage(this.getImage());
			}

			if (!this._alreadyCropped) {

				this.log('Cropping image');
				rect = this.getCropRect().clone();
				rect.limitCoordinates({
					left: 0,
					top: 0,
					width: this.getImage().getWidth(),
					height: this.getImage().getHeight()
				});

				coord = rect.getCoordinates();

				this._croppedImage = PNGImage.copyImage(this.getImage());
				this._croppedImage.clip(coord.x, coord.y, coord.width, coord.height);

				this._alreadyCropped = true;
			}

			return this._croppedImage;
		}
	},

	{
		/**
		 * @property TYPE
		 * @type {string}
		 * @static
		 */
		TYPE: 'CONFIGURATION_IMAGE'
	}
);

module.exports = Image;
