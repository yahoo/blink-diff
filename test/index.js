// Copyright 2014 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BlinkDiff = require('../');
var PNGImage = require('pngjs-image');
var Promise = require('promise');
var fs = require('fs');
var expect = require('chai').expect;

function generateImage (type) {
	var image;

	switch (type) {
		case "small-1":
			image = PNGImage.createImage(2, 2);
			image.setAt(0, 0, {red: 10, green: 20, blue: 30, alpha: 40});
			image.setAt(0, 1, {red: 50, green: 60, blue: 70, alpha: 80});
			image.setAt(1, 0, {red: 90, green: 100, blue: 110, alpha: 120});
			image.setAt(1, 1, {red: 130, green: 140, blue: 150, alpha: 160});
			break;

		case "small-2":
			image = PNGImage.createImage(2, 2);
			image.setAt(0, 0, {red: 210, green: 220, blue: 230, alpha: 240});
			image.setAt(0, 1, {red: 10, green: 20, blue: 30, alpha: 40});
			image.setAt(1, 0, {red: 50, green: 60, blue: 70, alpha: 80});
			image.setAt(1, 1, {red: 15, green: 25, blue: 35, alpha: 45});
			break;

		case "small-3":
			image = PNGImage.createImage(2, 2);
			break;

		case "medium-1":
			image = PNGImage.createImage(3, 3);
			image.setAt(0, 0, {red: 130, green: 140, blue: 150, alpha: 160});
			image.setAt(0, 1, {red: 170, green: 180, blue: 190, alpha: 200});
			image.setAt(0, 2, {red: 210, green: 220, blue: 230, alpha: 240});
			image.setAt(1, 0, {red: 15, green: 25, blue: 35, alpha: 45});
			image.setAt(1, 1, {red: 55, green: 65, blue: 75, alpha: 85});
			image.setAt(1, 2, {red: 95, green: 105, blue: 115, alpha: 125});
			image.setAt(2, 0, {red: 10, green: 20, blue: 30, alpha: 40});
			image.setAt(2, 1, {red: 50, green: 60, blue: 70, alpha: 80});
			image.setAt(2, 2, {red: 90, green: 100, blue: 110, alpha: 120});
			break;

		case "medium-2":
			image = PNGImage.createImage(3, 3);
			image.setAt(0, 0, {red: 95, green: 15, blue: 165, alpha: 26});
			image.setAt(0, 1, {red: 15, green: 225, blue: 135, alpha: 144});
			image.setAt(0, 2, {red: 170, green: 80, blue: 210, alpha: 2});
			image.setAt(1, 0, {red: 50, green: 66, blue: 23, alpha: 188});
			image.setAt(1, 1, {red: 110, green: 120, blue: 63, alpha: 147});
			image.setAt(1, 2, {red: 30, green: 110, blue: 10, alpha: 61});
			image.setAt(2, 0, {red: 190, green: 130, blue: 180, alpha: 29});
			image.setAt(2, 1, {red: 10, green: 120, blue: 31, alpha: 143});
			image.setAt(2, 2, {red: 155, green: 165, blue: 15, alpha: 185});
			break;

		case "slim-1":
			image = PNGImage.createImage(1, 3);
			image.setAt(0, 0, {red: 15, green: 225, blue: 135, alpha: 144});
			image.setAt(0, 1, {red: 170, green: 80, blue: 210, alpha: 2});
			image.setAt(0, 2, {red: 50, green: 66, blue: 23, alpha: 188});
			break;

		case "slim-2":
			image = PNGImage.createImage(3, 1);
			image.setAt(0, 0, {red: 15, green: 225, blue: 135, alpha: 144});
			image.setAt(1, 0, {red: 170, green: 80, blue: 210, alpha: 2});
			image.setAt(2, 0, {red: 50, green: 66, blue: 23, alpha: 188});
			break;
	}

	return image;
}

function compareBuffer (buf1, buf2) {

	if (buf1.length !== buf2.length) {
		return false;
	}

	for (var i = 0, len = buf1.length; i < len; i++) {
		if (buf1[i] !== buf2[i]) {
			return false;
		}
	}

	return true;
}

describe('Blink-Diff', function () {

	describe('Default values', function () {

		beforeEach(function () {
			this.instance = new BlinkDiff({
				imageA: "image-a", imageAPath: "path to image-a", imageB: "image-b", imageBPath: "path to image-b",

				composition: false
			});
		});

		it('should have the right values for imageA', function () {
			expect(this.instance._imageA).to.be.equal("image-a");
		});

		it('should have the right values for imageAPath', function () {
			expect(this.instance._imageAPath).to.be.equal("path to image-a");
		});

		it('should have the right values for imageB', function () {
			expect(this.instance._imageB).to.be.equal("image-b");
		});

		it('should have the right values for imageBPath', function () {
			expect(this.instance._imageBPath).to.be.equal("path to image-b");
		});

		it('should not have a value for imageOutputPath', function () {
			expect(this.instance._imageOutputPath).to.be.undefined;
		});

		it('should not have a value for thresholdType', function () {
			expect(this.instance._thresholdType).to.be.equal("pixel");
		});

		it('should not have a value for threshold', function () {
			expect(this.instance._threshold).to.be.equal(500);
		});

		it('should not have a value for delta', function () {
			expect(this.instance._delta).to.be.equal(20);
		});

		it('should not have a value for outputMaskRed', function () {
			expect(this.instance._outputMaskRed).to.be.equal(255);
		});

		it('should not have a value for outputMaskGreen', function () {
			expect(this.instance._outputMaskGreen).to.be.equal(0);
		});

		it('should not have a value for outputMaskBlue', function () {
			expect(this.instance._outputMaskBlue).to.be.equal(0);
		});

		it('should not have a value for outputMaskAlpha', function () {
			expect(this.instance._outputMaskAlpha).to.be.equal(255);
		});

		it('should not have a value for outputMaskOpacity', function () {
			expect(this.instance._outputMaskOpacity).to.be.equal(0.7);
		});

		it('should not have a value for outputBackgroundRed', function () {
			expect(this.instance._outputBackgroundRed).to.be.equal(0);
		});

		it('should not have a value for outputBackgroundGreen', function () {
			expect(this.instance._outputBackgroundGreen).to.be.equal(0);
		});

		it('should not have a value for outputBackgroundBlue', function () {
			expect(this.instance._outputBackgroundBlue).to.be.equal(0);
		});

		it('should not have a value for outputBackgroundAlpha', function () {
			expect(this.instance._outputBackgroundAlpha).to.be.undefined;
		});

		it('should not have a value for outputBackgroundOpacity', function () {
			expect(this.instance._outputBackgroundOpacity).to.be.equal(0.6);
		});

		it('should not have a value for copyImageAToOutput', function () {
			expect(this.instance._copyImageAToOutput).to.be.true;
		});

		it('should not have a value for copyImageBToOutput', function () {
			expect(this.instance._copyImageBToOutput).to.be.false;
		});

		it('should not have a value for filter', function () {
			expect(this.instance._filter).to.be.empty;
		});

		it('should not have a value for debug', function () {
			expect(this.instance._debug).to.be.false;
		});

		describe('Special cases', function () {

			beforeEach(function () {
				this.instance = new BlinkDiff({
					imageA: "image-a", imageB: "image-b"
				});
			});

			it('should have the images', function () {
				expect(this.instance._imageA).to.be.equal("image-a");
				expect(this.instance._imageB).to.be.equal("image-b");
			});
		})
	});

	describe('Methods', function () {

		beforeEach(function () {
			this.instance = new BlinkDiff({
				imageA: "image-a", imageAPath: "path to image-a", imageB: "image-b", imageBPath: "path to image-b"
			});
		});

		describe('hasPassed', function () {

			it('should pass when identical', function () {
				expect(this.instance.hasPassed(BlinkDiff.RESULT_IDENTICAL)).to.be.true;
			});

			it('should pass when similar', function () {
				expect(this.instance.hasPassed(BlinkDiff.RESULT_SIMILAR)).to.be.true;
			});

			it('should not pass when unknown', function () {
				expect(this.instance.hasPassed(BlinkDiff.RESULT_UNKNOWN)).to.be.false;
			});

			it('should not pass when different', function () {
				expect(this.instance.hasPassed(BlinkDiff.RESULT_DIFFERENT)).to.be.false;
			});
		});

		describe('_colorDelta', function () {
			it('should calculate the delta', function () {
				var color1 = {
						c1: 23, c2: 87, c3: 89, c4: 234
					}, color2 = {
						c1: 84, c2: 92, c3: 50, c4: 21
					};

				expect(this.instance._colorDelta(color1, color2)).to.be.within(225.02, 225.03);
			});
		});

		describe('_loadImage', function () {

			beforeEach(function () {
				this.image = generateImage('medium-2');
			});

			describe('from Image', function () {

				it('should use already loaded image', function () {
					var result = this.instance._loadImage("pathToFile", this.image);

					expect(result).to.be.an.instanceof(PNGImage);
					expect(result).to.be.equal(this.image)
				});
			});

			describe('from Path', function () {

				it('should load image when only path given', function (done) {
					var result = this.instance._loadImage(__dirname + '/test2.png');

					expect(result).to.be.an.instanceof(Promise);

					result.then(function (image) {
						var compare = compareBuffer(image.getImage().data, this.image.getImage().data);
						expect(compare).to.be.true;
						done();
					}.bind(this)).then(null, function (err) {
						done(err);
					});
				});
			});

			describe('from Buffer', function () {

				beforeEach(function () {
					this.buffer = fs.readFileSync(__dirname + '/test2.png');
				});

				it('should load image from buffer if given', function () {
					var result = this.instance._loadImage("pathToFile", this.buffer);

					expect(result).to.be.an.instanceof(Promise);

					result.then(function (image) {
						var compare = compareBuffer(image.getImage().data, this.image.getImage().data);
						expect(compare).to.be.true;
						done();
					}.bind(this)).then(null, function (err) {
						done(err);
					});
				});
			});
		});

		describe('_copyImage', function () {

			it('should copy the image', function () {
				var image1 = generateImage('small-1'), image2 = generateImage('small-2');

				this.instance._copyImage(image1, image2);

				expect(image1.getAt(0, 0)).to.be.equal(image2.getAt(0, 0));
				expect(image1.getAt(0, 1)).to.be.equal(image2.getAt(0, 1));
				expect(image1.getAt(1, 0)).to.be.equal(image2.getAt(1, 0));
				expect(image1.getAt(1, 1)).to.be.equal(image2.getAt(1, 1));
			});
		});

		describe('_correctDimensions', function () {

			describe('Missing Values', function () {

				it('should correct missing x values', function () {
					var rect = {y: 23, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(0);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct missing y values', function () {
					var rect = {x: 10, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(0);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct missing width values', function () {
					var rect = {x: 10, y: 23, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(290);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct missing height values', function () {
					var rect = {x: 10, y: 23, width: 42};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(177);
				});

				it('should correct all missing values', function () {
					var rect = {};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(0);
					expect(rect.y).to.be.equal(0);
					expect(rect.width).to.be.equal(300);
					expect(rect.height).to.be.equal(200);
				});
			});

			describe('Negative Values', function () {

				it('should correct negative x values', function () {
					var rect = {x: -10, y: 23, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(0);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct negative y values', function () {
					var rect = {x: 10, y: -23, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(0);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct negative width values', function () {
					var rect = {x: 10, y: 23, width: -42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(0);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct negative height values', function () {
					var rect = {x: 10, y: 23, width: 42, height: -57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(0);
				});

				it('should correct all negative values', function () {
					var rect = {x: -10, y: -23, width: -42, height: -57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(0);
					expect(rect.y).to.be.equal(0);
					expect(rect.width).to.be.equal(0);
					expect(rect.height).to.be.equal(0);
				});
			});

			describe('Dimensions', function () {

				it('should correct too big x values', function () {
					var rect = {x: 1000, y: 23, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(299);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(1);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct too big y values', function () {
					var rect = {x: 10, y: 2300, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(199);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(1);
				});

				it('should correct too big width values', function () {
					var rect = {x: 11, y: 23, width: 4200, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(11);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(289);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct too big height values', function () {
					var rect = {x: 11, y: 23, width: 42, height: 5700};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(11);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(177);
				});

				it('should correct too big width and height values', function () {
					var rect = {x: 11, y: 23, width: 420, height: 570};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(11);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(289);
					expect(rect.height).to.be.equal(177);
				});
			});

			describe('Border Dimensions', function () {

				it('should correct too big x values', function () {
					var rect = {x: 300, y: 23, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(299);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(1);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct too big y values', function () {
					var rect = {x: 10, y: 200, width: 42, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(10);
					expect(rect.y).to.be.equal(199);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(1);
				});

				it('should correct too big width values', function () {
					var rect = {x: 11, y: 23, width: 289, height: 57};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(11);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(289);
					expect(rect.height).to.be.equal(57);
				});

				it('should correct too big height values', function () {
					var rect = {x: 11, y: 23, width: 42, height: 177};

					this.instance._correctDimensions(300, 200, rect);

					expect(rect.x).to.be.equal(11);
					expect(rect.y).to.be.equal(23);
					expect(rect.width).to.be.equal(42);
					expect(rect.height).to.be.equal(177);
				});
			});
		});

		describe('_crop', function () {

			beforeEach(function () {
				this.croppedImage = generateImage('medium-1');
				this.expectedImage = generateImage('medium-1');
			});

			it('should crop image', function () {
				this.instance._crop("Medium-1", this.croppedImage, {x: 1, y: 2, width: 2, height: 1});

				expect(this.croppedImage.getWidth()).to.be.equal(2);
				expect(this.croppedImage.getHeight()).to.be.equal(1);

				expect(this.croppedImage.getAt(0, 0)).to.be.equal(this.expectedImage.getAt(1, 2));
				expect(this.croppedImage.getAt(1, 0)).to.be.equal(this.expectedImage.getAt(2, 2));
			});
		});

		describe('_clip', function () {

			it('should clip the image small and medium', function () {
				var image1 = generateImage('small-1'), image2 = generateImage('medium-2');

				this.instance._clip(image1, image2);

				expect(image1.getWidth()).to.be.equal(image2.getWidth());
				expect(image1.getHeight()).to.be.equal(image2.getHeight());
			});

			it('should clip the image medium and small', function () {
				var image1 = generateImage('medium-1'), image2 = generateImage('small-2');

				this.instance._clip(image1, image2);

				expect(image1.getWidth()).to.be.equal(image2.getWidth());
				expect(image1.getHeight()).to.be.equal(image2.getHeight());
			});

			it('should clip the image slim-1 and medium', function () {
				var image1 = generateImage('slim-1'), image2 = generateImage('medium-1');

				this.instance._clip(image1, image2);

				expect(image1.getWidth()).to.be.equal(image2.getWidth());
				expect(image1.getHeight()).to.be.equal(image2.getHeight());
			});

			it('should clip the image slim-2 and medium', function () {
				var image1 = generateImage('slim-2'), image2 = generateImage('medium-1');

				this.instance._clip(image1, image2);

				expect(image1.getWidth()).to.be.equal(image2.getWidth());
				expect(image1.getHeight()).to.be.equal(image2.getHeight());
			});

			it('should clip the image small and small', function () {
				var image1 = generateImage('small-2'), image2 = generateImage('small-1');

				this.instance._clip(image1, image2);

				expect(image1.getWidth()).to.be.equal(image2.getWidth());
				expect(image1.getHeight()).to.be.equal(image2.getHeight());
			});
		});

		describe('isAboveThreshold', function () {

			describe('Pixel threshold', function () {

				beforeEach(function () {
					this.instance._thresholdType = BlinkDiff.THRESHOLD_PIXEL;
					this.instance._threshold = 50;
				});

				it('should be below threshold', function () {
					expect(this.instance.isAboveThreshold(49)).to.be.false;
				});

				it('should be above threshold on border', function () {
					expect(this.instance.isAboveThreshold(50)).to.be.true;
				});

				it('should be above threshold', function () {
					expect(this.instance.isAboveThreshold(51)).to.be.true;
				});
			});

			describe('Percent threshold', function () {

				beforeEach(function () {
					this.instance._thresholdType = BlinkDiff.THRESHOLD_PERCENT;
					this.instance._threshold = 0.1;
				});

				it('should be below threshold', function () {
					expect(this.instance.isAboveThreshold(9, 100)).to.be.false;
				});

				it('should be above threshold on border', function () {
					expect(this.instance.isAboveThreshold(10, 100)).to.be.true;
				});

				it('should be above threshold', function () {
					expect(this.instance.isAboveThreshold(11, 100)).to.be.true;
				});
			});
		});

		describe('Comparison', function () {

			beforeEach(function () {
				this.image1 = generateImage('small-1');
				this.image2 = generateImage('small-2');
				this.image3 = generateImage('small-3');
				this.image4 = generateImage('small-1');

				this.maskColor = {
					red: 123, green: 124, blue: 125, alpha: 126
				};
				this.shiftColor = {
					red: 200, green: 100, blue: 0, alpha: 113
				};
				this.backgroundMaskColor = {
					red: 31, green: 33, blue: 35, alpha: 37
				};
			});

			describe('_pixelCompare', function () {

				it('should have no differences with a zero dimension', function () {
					var result, deltaThreshold = 10, width = 0, height = 0, hShift = 0, vShift = 0;

					result = this.instance._pixelCompare(this.image1, this.image2, this.image3, deltaThreshold, width, height, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

					expect(result).to.be.equal(0);
				});

				it('should have all differences', function () {
					var result, deltaThreshold = 10, width = 2, height = 2, hShift = 0, vShift = 0;

					result = this.instance._pixelCompare(this.image1, this.image2, this.image3, deltaThreshold, width, height, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

					expect(result).to.be.equal(4);
				});

				it('should have some differences', function () {
					var result, deltaThreshold = 100, width = 2, height = 2, hShift = 0, vShift = 0;

					result = this.instance._pixelCompare(this.image1, this.image2, this.image3, deltaThreshold, width, height, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

					expect(result).to.be.equal(2);
				});
			});

			describe('_compare', function () {

				beforeEach(function () {
					this.instance._thresholdType = BlinkDiff.THRESHOLD_PIXEL;
					this.instance._threshold = 3;
				});

				it('should be different', function () {
					var result, deltaThreshold = 10, hShift = 0, vShift = 0;

					result = this.instance._compare(this.image1, this.image2, this.image3, deltaThreshold, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

					expect(result).to.be.deep.equal({
						code: BlinkDiff.RESULT_DIFFERENT, differences: 4, dimension: 4, width: 2, height: 2
					});
				});

				it('should be similar', function () {
					var result, deltaThreshold = 100, hShift = 0, vShift = 0;

					result = this.instance._compare(this.image1, this.image2, this.image3, deltaThreshold, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

					expect(result).to.be.deep.equal({
						code: BlinkDiff.RESULT_SIMILAR, differences: 2, dimension: 4, width: 2, height: 2
					});
				});

				it('should be identical', function () {
					var result, deltaThreshold = 10, hShift = 0, vShift = 0;

					result = this.instance._compare(this.image1, this.image4, this.image3, deltaThreshold, this.maskColor, this.shiftColor, this.backgroundMaskColor, hShift, vShift);

					expect(result).to.be.deep.equal({
						code: BlinkDiff.RESULT_IDENTICAL, differences: 0, dimension: 4, width: 2, height: 2
					});
				});
			});
		});

		describe('Run', function () {

			beforeEach(function () {
				this.instance._imageA = generateImage('small-1');
				this.instance._imageB = generateImage('medium-1');

				this.instance._thresholdType = BlinkDiff.THRESHOLD_PIXEL;
				this.instance._threshold = 3;

				this.instance._composition = false;
			});

			it('should crop image-a', function (done) {
				this.instance._cropImageA = {width: 1, height: 2};
				this.instance.run(function (err, result) {
					if (err) {
						done(err);
					} else {
						try {
							expect(result.dimension).to.be.equal(2);
							done();
						} catch (err) {
							done(err);
						}
					}
				});
			});

			it('should crop image-b', function (done) {
				this.instance._cropImageB = {width: 1, height: 1};
				this.instance.run(function (err, result) {
					if (err) {
						done(err);
					} else {
						try {
							expect(result.dimension).to.be.equal(1);
							done();
						} catch (err) {
							done(err);
						}
					}
				});
			});

			it('should clip image-b', function (done) {
				this.instance.run(function (err, result) {
					if (err) {
						done(err);
					} else {
						try {
							expect(result.dimension).to.be.equal(4);
							done();
						} catch (err) {
							done(err);
						}
					}
				});
			});

			it('should crop and clip images', function (done) {
				this.instance._cropImageA = {width: 1, height: 2};
				this.instance._cropImageB = {width: 1, height: 1};
				this.instance.run(function (err, result) {
					if (err) {
						done(err);
					} else {
						try {
							expect(result.dimension).to.be.equal(1);
							done();
						} catch (err) {
							done(err);
						}
					}
				});
			});

			it('should write output file', function (done) {
				this.instance._imageOutputPath = __dirname + '/tmp.png';
				this.instance.run(function (err) {
					if (err) {
						done(err);
					} else {
						try {
							if (!fs.existsSync(__dirname + '/tmp.png')) {
								done(new Error('Could not write file.'));
							} else {
								done();
							}
						} catch (err) {
							done(err);
						}
					}
				});
			});

			it('should compare image-a to image-b', function (done) {
				this.instance.run(function (err, result) {
					if (err) {
						done(err);
					} else {
						try {
							expect(result.code).to.be.equal(BlinkDiff.RESULT_DIFFERENT);
							done();
						} catch (err) {
							done(err);
						}
					}
				});
			});

			it('should be black', function (done) {
				this.instance._delta = 1000;
				this.instance._copyImageAToOutput = false;
				this.instance._copyImageBToOutput = false;
				this.instance._outputBackgroundRed = 0;
				this.instance._outputBackgroundGreen = 0;
				this.instance._outputBackgroundBlue = 0;
				this.instance._outputBackgroundAlpha = 0;
				this.instance._outputBackgroundOpacity = undefined;

				this.instance.run(function (err) {
					if (err) {
						done(err);
					} else {
						try {
							expect(this.instance._imageOutput.getAt(0, 0)).to.be.equal(0);
							done();
						} catch (err) {
							done(err);
						}
					}
				}.bind(this));
			});

			it('should copy image-a to output by default', function (done) {
				this.instance._delta = 1000;
				this.instance._outputBackgroundRed = undefined;
				this.instance._outputBackgroundGreen = undefined;
				this.instance._outputBackgroundBlue = undefined;
				this.instance._outputBackgroundAlpha = undefined;
				this.instance._outputBackgroundOpacity = undefined;

				this.instance.run(function (err) {
					if (err) {
						done(err);
					} else {
						try {
							expect(this.instance._imageOutput.getAt(0, 0)).to.be.equal(this.instance._imageA.getAt(0, 0));
							done();
						} catch (err) {
							done(err);
						}
					}
				}.bind(this));
			});

			it('should copy image-a to output', function (done) {
				this.instance._delta = 1000;
				this.instance._copyImageAToOutput = true;
				this.instance._copyImageBToOutput = false;
				this.instance._outputBackgroundRed = undefined;
				this.instance._outputBackgroundGreen = undefined;
				this.instance._outputBackgroundBlue = undefined;
				this.instance._outputBackgroundAlpha = undefined;
				this.instance._outputBackgroundOpacity = undefined;

				this.instance.run(function (err) {
					if (err) {
						done(err);
					} else {
						try {
							expect(this.instance._imageOutput.getAt(0, 0)).to.be.equal(this.instance._imageA.getAt(0, 0));
							done();
						} catch (err) {
							done(err);
						}
					}
				}.bind(this));
			});

			it('should copy image-b to output', function (done) {
				this.instance._delta = 1000;
				this.instance._copyImageAToOutput = false;
				this.instance._copyImageBToOutput = true;
				this.instance._outputBackgroundRed = undefined;
				this.instance._outputBackgroundGreen = undefined;
				this.instance._outputBackgroundBlue = undefined;
				this.instance._outputBackgroundAlpha = undefined;
				this.instance._outputBackgroundOpacity = undefined;

				this.instance.run(function (err) {
					if (err) {
						done(err);
					} else {
						try {
							expect(this.instance._imageOutput.getAt(0, 0)).to.be.equal(this.instance._imageB.getAt(0, 0));
							done();
						} catch (err) {
							done(err);
						}
					}
				}.bind(this));
			});

			it('should run as promise', function (done) {
				var promise = this.instance.runWithPromise();

				expect(promise).to.be.instanceof(Promise);
				promise.then(function (result) {
					expect(result.code).to.be.equal(BlinkDiff.RESULT_DIFFERENT);
					done();
				}).then(null, function (err) {
					done(err);
				});
			});
		});

		describe('Color-Conversion', function () {

			it('should convert RGB to XYZ', function () {
				var color = this.instance._convertRgbToXyz({c1: 92 / 255, c2: 255 / 255, c3: 162 / 255, c4: 1});

				expect(color.c1).to.be.closeTo(0.6144431682352941, 0.0001);
				expect(color.c2).to.be.closeTo(0.8834245847058824, 0.0001);
				expect(color.c3).to.be.closeTo(0.6390158682352941, 0.0001);
				expect(color.c4).to.be.closeTo(1, 0.0001);
			});

			it('should convert Xyz to CIELab', function () {
				var color = this.instance._convertXyzToCieLab({
						c1: 0.6144431682352941, c2: 0.8834245847058824, c3: 0.6390158682352941, c4: 1
					});

				expect(color.c1).to.be.closeTo(95.30495102757038, 0.0001);
				expect(color.c2).to.be.closeTo(-54.68933740774734, 0.0001);
				expect(color.c3).to.be.closeTo(19.63870174748623, 0.0001);
				expect(color.c4).to.be.closeTo(1, 0.0001);
			});
		});
	});
});
