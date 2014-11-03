// Copyright 2014 Yahoo! Inc.
// Copyrights licensed under the Mit License. See the accompanying LICENSE file for terms.

var BlinkDiff = require('../');
var PNGImage = require('pngjs-image');
var Promise = require('promise');
var fs = require('fs');
var expect = require('chai').expect;

function generateImage (type) {
    var image;

    switch(type) {
        case "small-1":
            image = PNGImage.createImage(2, 2);
            image.setAt(0, 0, { red:10,  green:20,  blue:30,  alpha:40 });
            image.setAt(0, 1, { red:50,  green:60,  blue:70,  alpha:80 });
            image.setAt(1, 0, { red:90,  green:100, blue:110, alpha:120 });
            image.setAt(1, 1, { red:130, green:140, blue:150, alpha:160 });
            break;

        case "small-2":
            image = PNGImage.createImage(2, 2);
            image.setAt(0, 0, { red:210, green:220, blue:230, alpha:240 });
            image.setAt(0, 1, { red:10,  green:20,  blue:30,  alpha:40 });
            image.setAt(1, 0, { red:50,  green:60,  blue:70,  alpha:80 });
            image.setAt(1, 1, { red:15,  green:25,  blue:35,  alpha:45 });
            break;

        case "small-3":
            image = PNGImage.createImage(2, 2);
            break;

        case "medium-1":
            image = PNGImage.createImage(3, 3);
            image.setAt(0, 0, { red:130, green:140, blue:150, alpha:160 });
            image.setAt(0, 1, { red:170, green:180, blue:190, alpha:200 });
            image.setAt(0, 2, { red:210, green:220, blue:230, alpha:240 });
            image.setAt(1, 0, { red:15,  green:25,  blue:35,  alpha:45 });
            image.setAt(1, 1, { red:55,  green:65,  blue:75,  alpha:85 });
            image.setAt(1, 2, { red:95,  green:105, blue:115, alpha:125 });
            image.setAt(2, 0, { red:10,  green:20,  blue:30,  alpha:40 });
            image.setAt(2, 1, { red:50,  green:60,  blue:70,  alpha:80 });
            image.setAt(2, 2, { red:90,  green:100, blue:110, alpha:120 });
            break;

        case "medium-2":
            image = PNGImage.createImage(3, 3);
            image.setAt(0, 0, { red:95,  green:15,  blue:165, alpha:26 });
            image.setAt(0, 1, { red:15,  green:225, blue:135, alpha:144 });
            image.setAt(0, 2, { red:170, green:80,  blue:210, alpha:2 });
            image.setAt(1, 0, { red:50,  green:66,  blue:23,  alpha:188 });
            image.setAt(1, 1, { red:110, green:120, blue:63,  alpha:147 });
            image.setAt(1, 2, { red:30,  green:110, blue:10,  alpha:61 });
            image.setAt(2, 0, { red:190, green:130, blue:180, alpha:29 });
            image.setAt(2, 1, { red:10,  green:120, blue:31,  alpha:143 });
            image.setAt(2, 2, { red:155, green:165, blue:15,  alpha:185 });
            break;

        case "slim-1":
            image = PNGImage.createImage(1, 3);
            image.setAt(0, 0, { red:15,  green:225, blue:135, alpha:144 });
            image.setAt(0, 1, { red:170, green:80,  blue:210, alpha:2 });
            image.setAt(0, 2, { red:50,  green:66,  blue:23,  alpha:188 });
            break;

        case "slim-2":
            image = PNGImage.createImage(3, 1);
            image.setAt(0, 0, { red:15,  green:225, blue:135, alpha:144 });
            image.setAt(1, 0, { red:170, green:80,  blue:210, alpha:2 });
            image.setAt(2, 0, { red:50,  green:66,  blue:23,  alpha:188 });
            break;
    }

    return image;
}

describe('Blink-Diff', function () {

    describe('Default values', function () {

        beforeEach(function () {
            this.instance = new BlinkDiff({
                imageA: "image-a",
                imageAPath: "path to image-a",
                imageB: "image-b",
                imageBPath: "path to image-b",

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

        it('should not have a value for verbose', function () {
            expect(this.instance._verbose).to.be.false;
        });

        it('should not have a value for thresholdType', function () {
            expect(this.instance._thresholdType).to.be.equal("pixel");
        });

        it('should not have a value for threshold', function () {
            expect(this.instance._threshold).to.be.equal(100);
        });

        it('should not have a value for delta', function () {
            expect(this.instance._delta).to.be.equal(15);
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
            expect(this.instance._outputMaskOpacity).to.be.undefined;
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
            expect(this.instance._outputBackgroundOpacity).to.be.equal(0.1);
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
                    imageA: "image-a",
                    imageB: "image-b"
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
                imageA: "image-a",
                imageAPath: "path to image-a",
                imageB: "image-b",
                imageBPath: "path to image-b"
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
                        red: 23,
                        green: 87,
                        blue: 89,
                        alpha: 234
                    },
                    color2 = {
                        red: 84,
                        green: 92,
                        blue: 50,
                        alpha: 21
                    };

                expect(this.instance._colorDelta(color1, color2)).to.be.within(225.02, 225.03);
            });
        });

        describe('_loadImage', function () {

            beforeEach(function () {
                this.image = generateImage('small-1');
            });

            it('should use already loaded image', function () {
                var result = this.instance._loadImage("pathToFile", this.image);
                expect(result).to.be.equal(this.image)
            });

            it('should load image when path given', function (done) {
                var result = this.instance._loadImage(__dirname + '/test.png', undefined);

                expect(result).to.be.an.instanceof(Promise);

                result.then(function () {
                    done();
                }, function (err) {
                    done(err);
                });
            });
        });

        describe('_copyImage', function () {

            it('should copy the image', function () {
                var image1 = generateImage('small-1'),
                    image2 = generateImage('small-2');

                this.instance._copyImage(image1, image2);

                expect(image1.getAt(0, 0)).to.be.equal(image2.getAt(0, 0));
                expect(image1.getAt(0, 1)).to.be.equal(image2.getAt(0, 1));
                expect(image1.getAt(1, 0)).to.be.equal(image2.getAt(1, 0));
                expect(image1.getAt(1, 1)).to.be.equal(image2.getAt(1, 1));
            });
        });

        describe('_clip', function () {

            it('should clip the image small and medium', function () {
                var image1 = generateImage('small-1'),
                    image2 = generateImage('medium-2');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image medium and small', function () {
                var image1 = generateImage('medium-1'),
                    image2 = generateImage('small-2');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image slim-1 and medium', function () {
                var image1 = generateImage('slim-1'),
                    image2 = generateImage('medium-1');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image slim-2 and medium', function () {
                var image1 = generateImage('slim-2'),
                    image2 = generateImage('medium-1');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });

            it('should clip the image small and small', function () {
                var image1 = generateImage('small-2'),
                    image2 = generateImage('small-1');

                this.instance._clip(image1, image2);

                expect(image1.getWidth()).to.be.equal(image2.getWidth());
                expect(image1.getHeight()).to.be.equal(image2.getHeight());
            });
        });

        describe('_pixelDelta', function () {

            it('should calculate the pixel delta', function () {
                var image1 = generateImage('small-1'),
                    image2 = generateImage('small-2'),
                    result;

                result = this.instance._pixelDelta(image1, image2, 0);

                expect(result).to.be.equal(400);
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
                    red: 123,
                    green: 124,
                    blue: 125,
                    alpha: 126
                };
                this.backgroundMaskColor = {
                    red: 31,
                    green: 33,
                    blue: 35,
                    alpha: 37
                };
            });

            describe('_pixelCompare', function () {

                it('should have no differences with a zero dimension', function () {
                    var result,
                        deltaThreshold = 10,
                        dimension = 0;

                    result = this.instance._pixelCompare(
                        this.image1, this.image2, this.image3,
                        deltaThreshold, dimension,
                        this.maskColor, this.backgroundMaskColor
                    );

                    expect(result).to.be.equal(0);
                });

                it('should have all differences', function () {
                    var result,
                        deltaThreshold = 10,
                        dimension = 4;

                    result = this.instance._pixelCompare(
                        this.image1, this.image2, this.image3,
                        deltaThreshold, dimension,
                        this.maskColor, this.backgroundMaskColor
                    );

                    expect(result).to.be.equal(4);
                });

                it('should have some differences', function () {
                    var result,
                        deltaThreshold = 100,
                        dimension = 4;

                    result = this.instance._pixelCompare(
                        this.image1, this.image2, this.image3,
                        deltaThreshold, dimension,
                        this.maskColor, this.backgroundMaskColor
                    );

                    expect(result).to.be.equal(2);
                });
            });

            describe('_compare', function () {

                beforeEach(function () {
                    this.instance._thresholdType = BlinkDiff.THRESHOLD_PIXEL;
                    this.instance._threshold = 3;
                });

                it('should be different', function () {
                    var result,
                        deltaThreshold = 10;

                    result = this.instance._compare(
                        this.image1, this.image2, this.image3,
                        deltaThreshold,
                        this.maskColor, this.backgroundMaskColor
                    );

                    expect(result).to.be.deep.equal({
                        code: BlinkDiff.RESULT_DIFFERENT,
                        differences: 4,
                        dimension: 4,
                        width: 2,
                        height: 2
                    });
                });

                it('should be similar', function () {
                    var result,
                        deltaThreshold = 100;

                    result = this.instance._compare(
                        this.image1, this.image2, this.image3,
                        deltaThreshold,
                        this.maskColor, this.backgroundMaskColor
                    );

                    expect(result).to.be.deep.equal({
                        code: BlinkDiff.RESULT_SIMILAR,
                        differences: 2,
                        dimension: 4,
                        width: 2,
                        height: 2
                    });
                });

                it('should be identical', function () {
                    var result,
                        deltaThreshold = 10;

                    result = this.instance._compare(
                        this.image1, this.image4, this.image3,
                        deltaThreshold,
                        this.maskColor, this.backgroundMaskColor
                    );

                    expect(result).to.be.deep.equal({
                        code: BlinkDiff.RESULT_IDENTICAL,
                        differences: 0,
                        dimension: 4,
                        width: 2,
                        height: 2
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
                    try {
                        expect(result.code).to.be.equal(BlinkDiff.RESULT_DIFFERENT);
                        done();
                    } catch (err) {
                        done(err);
                    }
                }, function (err) {
                    done(err);
                });
            });
        });
    });
});