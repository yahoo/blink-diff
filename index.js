// Copyright 2014 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var assert = require('assert'),
    PNGImage = require('pngjs-image'),
    Promise = require('promise');

/**
 * Blink-diff comparison class
 *
 * @constructor
 * @class BlinkDiff
 * @param {object} options
 * @param {PNGImage} options.imageA Image object of first image
 * @param {string} options.imageAPath Path to first image
 * @param {PNGImage} options.imageB Image object of second image
 * @param {string} options.imageBPath Path to second image
 * @param {string} [options.imageOutputPath=undefined] Path to output image file
 * @param {boolean} [options.verbose=false] Verbose output?
 * @param {string} [options.thresholdType=BlinkDiff.THRESHOLD_PIXEL] Defines the threshold of the comparison
 * @param {int} [options.threshold=100] Threshold limit according to the comparison limit.
 * @param {number} [options.delta=15] Distance between the color coordinates in the 4 dimensional color-space that will not trigger a difference.
 * @param {int} [options.outputMaskRed=255] Value to set for red on difference pixel. 'Undefined' will not change the value.
 * @param {int} [options.outputMaskGreen=0] Value to set for green on difference pixel. 'Undefined' will not change the value.
 * @param {int} [options.outputMaskBlue=0] Value to set for blue on difference pixel. 'Undefined' will not change the value.
 * @param {int} [options.outputMaskAlpha=255] Value to set for the alpha channel on difference pixel. 'Undefined' will not change the value.
 * @param {int} [options.outputMaskOpacity=undefined] Strength of masking the pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel.
 * @param {int} [options.outputBackgroundRed=0] Value to set for red as background. 'Undefined' will not change the value.
 * @param {int} [options.outputBackgroundGreen=0] Value to set for green as background. 'Undefined' will not change the value.
 * @param {int} [options.outputBackgroundBlue=0] Value to set for blue as background. 'Undefined' will not change the value.
 * @param {int} [options.outputBackgroundAlpha=undefined] Value to set for the alpha channel as background. 'Undefined' will not change the value.
 * @param {int} [options.outputBackgroundOpacity=0.1] Strength of masking the pixel. 1.0 means that the full color will be used; anything less will mix-in the original pixel.
 * @param {boolean} [options.copyImageAToOutput=true]  Copies the first image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the first image.
 * @param {boolean} [options.copyImageBToOutput=false] Copies the second image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the second image.
 * @param {string[]} [options.filter=[]] Filters that will be applied before the comparison. Available filters are: blur, grayScale, gaussianBlur, lightness, luma, luminosity, sepia
 * @param {boolean} [options.debug=false] When set, then the applied filters will be shown on the output image.
 * @param {boolean} [options.composition=true] Should a composition be created to compare?
 * @param {boolean} [options.composeLeftToRight=false] Create composition from left to right, otherwise let it decide on its own whats best
 * @param {boolean} [options.composeTopToBottom=false] Create composition from top to bottom, otherwise let it decide on its own whats best
 *
 * @property {PNGImage} _imageA
 * @property {PNGImage} _imageACompare
 * @property {string} _imageAPath
 * @property {PNGImage} _imageB
 * @property {PNGImage} _imageBCompare
 * @property {string} _imageBPath
 * @property {PNGImage} _imageOutput
 * @property {string} _imageOutputPath
 * @property {boolean} _verbose
 * @property {string} _thresholdType
 * @property {int} _threshold
 * @property {number} _delta
 * @property {int} _outputMaskRed
 * @property {int} _outputMaskGreen
 * @property {int} _outputMaskBlue
 * @property {int} _outputMaskAlpha
 * @property {int} _outputMaskOpacity
 * @property {int} _outputBackgroundRed
 * @property {int} _outputBackgroundGreen
 * @property {int} _outputBackgroundBlue
 * @property {int} _outputBackgroundAlpha
 * @property {int} _outputBackgroundOpacity
 * @property {boolean} _copyImageAToOutput
 * @property {boolean} _copyImageBToOutput
 * @property {string[]} _filter
 * @property {boolean} _debug
 * @property {boolean} _composition
 * @property {boolean} _composeLeftToRight
 * @property {boolean} _composeTopToBottom
 */
function BlinkDiff (options) {

    this._imageA = options.imageA;
    this._imageAPath = options.imageAPath;
    assert.ok(options.imageAPath || options.imageA, "Path to image A not given.");

    this._imageB = options.imageB;
    this._imageBPath = options.imageBPath;
    assert.ok(options.imageBPath || options.imageB, "Path to image B not given.");

    this._imageOutput = null;
    this._imageOutputPath = options.imageOutputPath;

    this._verbose = options.verbose || false;

    // Pixel or Percent
    this._thresholdType = options.thresholdType || BlinkDiff.THRESHOLD_PIXEL;

    // How many pixels different to ignore.
    this._threshold = options.threshold || 100;

    this._delta = options.delta || 10;

    this._outputMaskRed = options.outputMaskRed || 255;
    this._outputMaskGreen = options.outputMaskGreen || 0;
    this._outputMaskBlue = options.outputMaskBlue || 0;
    this._outputMaskAlpha = options.outputMaskAlpha || 255;
    this._outputMaskOpacity = options.outputMaskOpacity || 0.7;

    this._outputBackgroundRed = options.outputBackgroundRed || 0;
    this._outputBackgroundGreen = options.outputBackgroundGreen || 0;
    this._outputBackgroundBlue = options.outputBackgroundBlue || 0;
    this._outputBackgroundAlpha = options.outputBackgroundAlpha;
    this._outputBackgroundOpacity = options.outputBackgroundOpacity || 0.5;

    this._copyImageAToOutput = options.copyImageAToOutput || true;
    this._copyImageBToOutput = options.copyImageBToOutput || false;

    this._filter = options.filter || [];

    this._debug = options.debug || false;

    this._composition = options.composition || true;
    this._composeLeftToRight = options.composeLeftToRight || false;
    this._composeTopToBottom = options.composeTopToBottom || false;
}


/**
 * Version of class
 *
 * @static
 * @property version
 * @type {string}
 */
BlinkDiff.version = require('./package.json').version;


/**
 * Threshold-type for pixel
 *
 * @static
 * @property THRESHOLD_PIXEL
 * @type {string}
 */
BlinkDiff.THRESHOLD_PIXEL = 'pixel';

/**
 * Threshold-type for percent of all pixels
 *
 * @static
 * @property THRESHOLD_PERCENT
 * @type {string}
 */
BlinkDiff.THRESHOLD_PERCENT = 'percent';


/**
 * Unknown result of the comparison
 *
 * @static
 * @property RESULT_UNKNOWN
 * @type {int}
 */
BlinkDiff.RESULT_UNKNOWN = 0;

/**
 * The images are too different
 *
 * @static
 * @property RESULT_DIFFERENT
 * @type {int}
 */
BlinkDiff.RESULT_DIFFERENT = 1;

/**
 * The images are identical (or near identical)
 *
 * @static
 * @property RESULT_IDENTICAL
 * @type {int}
 */
BlinkDiff.RESULT_IDENTICAL = 5;

/**
 * The images are very similar, but still below the threshold
 *
 * @static
 * @property RESULT_SIMILAR
 * @type {int}
 */
BlinkDiff.RESULT_SIMILAR = 7;


BlinkDiff.prototype = {

    /**
     * Runs the comparison with a promise
     *
     * @method runWithPromise
     * @example
     *     var blinkDiff = BlinkDiff(...);
     *     blinkDiff.runWithPromise().then(function (result) {
     *       ...
     *     });
     * @return {Promise}
     */
    runWithPromise: function () {
        return Promise.denodeify(this.run).call(this);
    },

    /**
     * Runs the comparison in node-style
     *
     * @method run
     * @example
     *     var blinkDiff = BlinkDiff(...);
     *     blinkDiff.run(function (err, result) {
     *       if (err) {
     *         throw err;
     *       }
     *
     *       ...
     *     });
     *
     * @param {function} fn
     */
    run: function (fn) {

        var promise = Promise.resolve(),
            result;

        PNGImage.log = function (text) {
            this.log('ERROR: ' + text);
            throw new Error('ERROR: ' + text);
        }.bind(this);

        promise.then(function () {
            return this._loadImage(this._imageAPath, this._imageA);

        }.bind(this)).then(function (imageA) {
            this._imageA = imageA;
            return this._loadImage(this._imageBPath, this._imageB);

        }.bind(this)).then(function (imageB) {
            this._imageB = imageB;

            // Always clip
            this._clip(this._imageA, this._imageB);

            this._imageOutput = PNGImage.createImage(this._imageA.getWidth(), this._imageA.getHeight());

            if (this._copyImageAToOutput) {
                this._copyImage(this._imageA, this._imageOutput);
            } else if (this._copyImageBToOutput) {
                this._copyImage(this._imageB, this._imageOutput);
            }

            this._imageACompare = this._imageA.applyFilters(this._filter, !this._debug);
            this._imageBCompare = this._imageB.applyFilters(this._filter, !this._debug);

            result = this._compare(this._imageACompare, this._imageBCompare, this._imageOutput, this._delta,
                { // Output-Mask color
                    red: this._outputMaskRed,
                    green: this._outputMaskGreen,
                    blue: this._outputMaskBlue,
                    alpha: this._outputMaskAlpha,
                    opacity: this._outputMaskOpacity
                },
                { // Background color
                    red: this._outputBackgroundRed,
                    green: this._outputBackgroundGreen,
                    blue: this._outputBackgroundBlue,
                    alpha: this._outputBackgroundAlpha,
                    opacity: this._outputBackgroundOpacity
                }
            );

            // Create composition if requested
            this._imageOutput = this._createComposition(this._imageACompare, this._imageBCompare, this._imageOutput);

            // Need to write to the filesystem?
            if (this._imageOutputPath) {
                this._imageOutput.writeImage(this._imageOutputPath, function (err) {
                    if (err) {
                        fn(err);
                    } else {
                        this.log("Wrote differences to " + this._imageOutputPath);
                        fn(undefined, result);
                    }
                }.bind(this));
            } else {
                fn(undefined, result);
            }

        }.bind(this)).then(null, function (err) {
            console.error(err.stack);
            fn(err);
        });
    },

    /**
     * Creates a comparison image
     *
     * @method _createComposition
     * @param {PNGImage} imageA
     * @param {PNGImage} imageB
     * @param {PNGImage} imageOutput
     * @return {PNGImage}
     * @private
     */
    _createComposition: function (imageA, imageB, imageOutput) {

        var width,
            height,
            image = imageOutput;

        if (this._composition) {
            width = Math.max(imageA.getWidth(), imageB.getWidth());
            height = Math.max(imageA.getHeight(), imageB.getHeight());

            if (((width > height) && !this._composeLeftToRight) || this._composeTopToBottom) {
                image = PNGImage.createImage(width, height * 3);

                imageA.getImage().bitblt(image.getImage(), 0, 0, imageA.getWidth(), imageA.getHeight(), 0, 0);
                imageOutput.getImage().bitblt(image.getImage(), 0, 0, imageOutput.getWidth(), imageOutput.getHeight(), 0, height);
                imageB.getImage().bitblt(image.getImage(), 0, 0, imageB.getWidth(), imageB.getHeight(), 0, height * 2);
            } else {
                image = PNGImage.createImage(width * 3, height);

                imageA.getImage().bitblt(image.getImage(), 0, 0, imageA.getWidth(), imageA.getHeight(), 0, 0);
                imageOutput.getImage().bitblt(image.getImage(), 0, 0, imageOutput.getWidth(), imageOutput.getHeight(), width, 0);
                imageB.getImage().bitblt(image.getImage(), 0, 0, imageB.getWidth(), imageB.getHeight(), width * 2, 0);
            }
        }

        return image;
    },

    /**
     * Loads the image or uses the already available image
     *
     * @method _loadImage
     * @param {string} path
     * @param {PNGImage} image
     * @return {PNGImage|Promise}
     * @private
     */
    _loadImage: function (path, image) {
        if (image) {
            return image;
        } else {
            return Promise.denodeify(PNGImage.readImage)(path);
        }
    },

    /**
     * Copies one image into another image
     *
     * @method _copyImage
     * @param {PNGImage} imageSrc
     * @param {PNGImage} imageDst
     * @private
     */
    _copyImage: function (imageSrc, imageDst) {
        imageSrc.getImage().bitblt(
            imageDst.getImage(),
            0, 0,
            imageSrc.getWidth(),
            imageSrc.getHeight(),
            0, 0
        );
    },


    /**
     * Is the difference above the set threshold?
     *
     * @method isAboveThreshold
     * @param {int} items
     * @param {int} [total]
     * @return {boolean}
     */
    isAboveThreshold: function (items, total) {

        if ((this._thresholdType === BlinkDiff.THRESHOLD_PIXEL) && (this._threshold <= items)) {
            return true;

        } else if (this._threshold <= (items / total)) {
            return true;
        }

        return false;
    },


    /**
     * Log method that can be overwritten to modify the logging behavior.
     *
     * @method log
     * @param {string} text
     */
    log: function (text) {
        // Nothing here; Overwrite this to add some functionality
    },


    /**
     * Has comparison passed?
     *
     * @method hasPassed
     * @param {int} result Comparison result-code
     * @return {boolean}
     */
    hasPassed: function (result) {
        return ((result !== BlinkDiff.RESULT_DIFFERENT) && (result !== BlinkDiff.RESULT_UNKNOWN));
    },


    /**
     * Clips the images to the lower resolution of both
     *
     * @private
     * @method _clip
     * @param {PNGImage} imageA Source image
     * @param {PNGImage} imageB Destination image
     */
    _clip: function (imageA, imageB) {

        var minWidth,
            minHeight;

        if ((imageA.getWidth() != imageB.getWidth()) || (imageA.getHeight() != imageB.getHeight())) {

            minWidth = imageA.getWidth();
            if (imageB.getWidth() < minWidth) {
                minWidth = imageB.getWidth();
            }

            minHeight = imageA.getHeight();
            if (imageB.getHeight() < minHeight) {
                minHeight = imageB.getHeight();
            }

            this.log("Clipping to " + minWidth + " x " + minHeight);

            imageA.clip(0, 0, minWidth, minHeight);
            imageB.clip(0, 0, minWidth, minHeight);
        }
    },


    /**
     * Calculates the distance of colors in the 4 dimensional color space
     *
     * @method _colorDelta
     * @param {object} color1 Values for color 1
     * @param {int} color1.red Red value of color 1
     * @param {int} color1.green Green value of color 1
     * @param {int} color1.blue Blue value of color 1
     * @param {int} color1.alpha Alpha value of color 1
     * @param {object} color2 Values for color 2
     * @param {int} color2.red Red value of color 2
     * @param {int} color2.green Green value of color 2
     * @param {int} color2.blue Blue value of color 2
     * @param {int} color2.alpha Alpha value of color 2
     * @return {number} Distance
     * @private
     */
    _colorDelta: function (color1, color2) {
        var cR, cG, cB, cA;

        cR = Math.pow(color1.red - color2.red, 2);
        cG = Math.pow(color1.green - color2.green, 2);
        cB = Math.pow(color1.blue - color2.blue, 2);
        cA = Math.pow(color1.alpha - color2.alpha, 2);

        return Math.sqrt(cR + cG + cB + cA);
    },

    /**
     * Calculates the distance of pixels in the 4 dimensional color space
     *
     * @method _pixelDelta
     * @param {PNGImage} imageA Source image
     * @param {PNGImage} imageB Destination image
     * @param {int} idx Index of pixel in both images
     * @return {number} Distance
     * @private
     */
    _pixelDelta: function (imageA, imageB, idx) {
        var color1 = {
                red: imageA.getRed(idx),
                green: imageA.getGreen(idx),
                blue: imageA.getBlue(idx),
                alpha: imageA.getAlpha(idx)
            },
            color2 = {
                red: imageB.getRed(idx),
                green: imageB.getGreen(idx),
                blue: imageB.getBlue(idx),
                alpha: imageB.getAlpha(idx)
            };

        return this._colorDelta(color1, color2);
    },

    /**
     * Does a quick comparison between the supplied images
     *
     * @method _pixelCompare
     * @param {PNGImage} imageA
     * @param {PNGImage} imageB
     * @param {PNGImage} imageOutput
     * @param {number} deltaThreshold
     * @param {int} dimension Dimensions of the images
     * @param {object} outputMaskColor
     * @param {int} [outputMaskColor.red]
     * @param {int} [outputMaskColor.green]
     * @param {int} [outputMaskColor.blue]
     * @param {int} [outputMaskColor.alpha]
     * @param {int} [outputMaskColor.opacity]
     * @param {object} backgroundColor
     * @param {int} [backgroundColor.red]
     * @param {int} [backgroundColor.green]
     * @param {int} [backgroundColor.blue]
     * @param {int} [backgroundColor.alpha]
     * @param {int} [backgroundColor.opacity]
     * @return {int} Number of pixel differences
     * @private
     */
    _pixelCompare: function (imageA, imageB, imageOutput, deltaThreshold, dimension, outputMaskColor, backgroundColor) {
        var difference = 0,
            i, len,
            delta;

        for (i = 0, len = dimension; i < len; i++) {
            delta = this._pixelDelta(imageA, imageB, i);

            if (delta > deltaThreshold) {
                difference++;
                imageOutput.setAtIndex(i, outputMaskColor);
            } else {
                imageOutput.setAtIndex(i, backgroundColor);
            }
        }

        return difference;
    },

    /**
     * Compares the two images supplied
     *
     * @method _compare
     * @param {PNGImage} imageA
     * @param {PNGImage} imageB
     * @param {PNGImage} imageOutput
     * @param {number} deltaThreshold
     * @param {object} outputMaskColor
     * @param {int} [outputMaskColor.red]
     * @param {int} [outputMaskColor.green]
     * @param {int} [outputMaskColor.blue]
     * @param {int} [outputMaskColor.alpha]
     * @param {int} [outputMaskColor.opacity]
     * @param {object} backgroundColor
     * @param {int} [backgroundColor.red]
     * @param {int} [backgroundColor.green]
     * @param {int} [backgroundColor.blue]
     * @param {int} [backgroundColor.alpha]
     * @param {int} [backgroundColor.opacity]
     * @return {object}
     * @private
     */
    _compare: function (imageA, imageB, imageOutput, deltaThreshold, outputMaskColor, backgroundColor) {

        var result = {
                code: BlinkDiff.RESULT_UNKNOWN,
                differences: undefined,
                dimension: undefined,
                width: undefined,
                height: undefined
            };

        // Get some data needed for comparison
        result.width = imageA.getWidth();
        result.height = imageA.getHeight();
        result.dimension = result.width * result.height;

        // Check if identical
        result.differences = this._pixelCompare(
            imageA,
            imageB,
            imageOutput,
            deltaThreshold,
            result.dimension,
            outputMaskColor,
            backgroundColor
        );

        // Result
        if (result.differences == 0) {
            this.log("Images are identical or near identical");
            result.code = BlinkDiff.RESULT_IDENTICAL;
            return result;

        } else if (this.isAboveThreshold(result.differences, result.dimension)) {
            this.log("Images are visibly different");
            this.log(result.differences + " pixels are different");
            result.code = BlinkDiff.RESULT_DIFFERENT;
            return result;

        } else {
            this.log("Images are similar");
            this.log(result.differences + " pixels are different");
            result.code = BlinkDiff.RESULT_SIMILAR;
            return result;
        }
    }
};

module.exports = BlinkDiff;
