Blink-Diff
==========

A lightweight image comparison tool

[![Build Status](https://secure.travis-ci.org/yahoo/blink-diff.png)](http://travis-ci.org/yahoo/blink-diff)
[![npm version](https://badge.fury.io/js/blink-diff.svg)](http://badge.fury.io/js/blink-diff)

[![NPM](https://nodei.co/npm/blink-diff.png?downloads=true)](https://nodei.co/npm/blink-diff/)


[API-Documentation](http://yahoo.github.io/blink-diff/docs/)

[Coverage Report](http://yahoo.github.io/blink-diff/coverage/lcov-report/)


**Table of Contents**
* [Installation](#installation)
* [Usage](#usage)
    * [Command-Line Usage](#command-line-usage)
    * [Object Usage](#object-usage)
    * [Logging](#logging)
* [Examples](#examples)
* [Results](#results)
* [API-Documentation](#api-documentation)
* [Tests](#tests)
* [Project Naming](#project-naming)
* [Third-party libraries](#third-party-libraries)
* [License](#license)


##Installation

Install this module with the following command:
```shell
npm install blink-diff
```

Add the module to your ```package.json``` dependencies:
```shell
npm install --save blink-diff
```
Add the module to your ```package.json``` dev-dependencies:
```shell
npm install --save-dev blink-diff
```

##Usage

The package can be used in two different ways:
 * per command line
 * through an object

###Command-Line usage

The command-line tool can be found in the ```bin``` directory. You can run the application with

```shell
blink-diff --output <output>.png <image1>.png <image2>.png
```
Use ```image1``` and ```image2``` as the images you want to compare.
Only PNGs are supported at this point.


The command-line tool exposes a couple of flags and parameters for the comparison:
```shell
--verbose           Turn on verbose mode
--threshold p       Number of pixels/percent 'p' below which differences are ignored
--threshold-type t  'pixel' and 'percent' as type of threshold. (default: pixel)
--delta p           Max. distance colors in the 4 dimensional color-space without triggering a difference. (default: 20)
--copyImageA        Copies first image to output as base. (default: true)
--copyImageB        Copies second image to output as base.
--no-copy           Doesn't copy anything to output as base.
--output o          Write difference to the file 'o'
--filter f          Filters f (separated with comma) that will be applied before the comparison.
--no-composition    Turns the composition feature off
--compose-ltr       Compose output image from left to right
--compose-ttb       Compose output image from top to bottom
--hide-shift        Hides shift highlighting (default: false)
--h-shift           Acceptable horizontal shift of pixel. (default: 0)
--v-shift           Acceptable vertical shift of pixel. (default: 0)
--version           Print version
--help              This help
```


###Object usage

The package can also be used directly in code, without going through the command-line.

**Example:**
```javascript
var diff = new BlinkDiff({
    imageAPath: '...',
    imageBPath: '...',

    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.01,

    outputPath: '...'
});

diff.run(function (error) {
    console.log(error ? 'Failed' : 'Passed');
});
```

All the parameters that were available in the command-line tool are also available through the class constructor, however they might use slightly different wording. The class exposes additional parameters that are not available from the command-line:
* ```imageAPath``` Defines the path to the first image that should be compared (required; one or the other)
* ```imageA``` Supplies first image that should be compared (required; one or the other)
* ```imageBPath``` Defines the path to the second image that should be compared (required; one or the other)
* ```imageB``` Supplies second image that should be compared (required; one or the other)
* ```imageOutputPath``` Defines the path to the output-file. If you leaves this one off, then this feature is turned-off.
* ```verbose``` Verbose output (default: false)
* ```thresholdType``` Type of threshold check. This can be BlinkDiff.THRESHOLD_PIXEL and BlinkDiff.THRESHOLD_PERCENT (default: BlinkDiff.THRESHOLD_PIXEL)
* ```threshold``` Number of pixels/percent p below which differences are ignored (default: 500)
* ```delta``` Distance between the color coordinates in the 4 dimensional color-space that will not trigger a difference. (default: 20)
* ```outputMaskRed``` Red intensity for the difference highlighting in the output file (default: 255)
* ```outputMaskGreen``` Green intensity for the difference highlighting in the output file (default: 0)
* ```outputMaskBlue``` Blue intensity for the difference highlighting in the output file (default: 0)
* ```outputMaskAlpha``` Alpha intensity for the difference highlighting in the output file (default: 255)
* ```outputMaskOpacity``` Opacity of the pixel for the difference highlighting in the output file (default: 0.7 - slightly transparent)
* ```outputShiftRed``` Red intensity for the shift highlighting in the output file (default: 255)
* ```outputShiftGreen``` Green intensity for the shift highlighting in the output file (default: 165)
* ```outputShiftBlue``` Blue intensity for the shift highlighting in the output file (default: 0)
* ```outputShiftAlpha``` Alpha intensity for the shift highlighting in the output file (default: 255)
* ```outputShiftOpacity``` Opacity of the pixel for the shift highlighting in the output file (default: 0.7 - slightly transparent)
* ```outputBackgroundRed``` Red intensity for the background in the output file (default: 0)
* ```outputBackgroundGreen``` Green intensity for the background in the output file (default: 0)
* ```outputBackgroundBlue``` Blue intensity for the background in the output file (default: 0)
* ```outputBackgroundAlpha``` Alpha intensity for the background in the output file (default: undefined)
* ```outputMaskOpacity``` Opacity of the pixel for the background in the output file (default: 0.6 - transparent)
* ```copyImageAToOutput``` Copies the first image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the first image. (default)
* ```copyImageBToOutput``` Copies the second image to the output image before the comparison begins. This will make sure that the output image will highlight the differences on the second image.
* ```filter``` Filters that will be applied before the comparison. Available filters are: blur, grayScale, lightness, luma, luminosity, sepia
* ```debug``` When set, then the applied filters will be shown on the output image. (default: false)
* ```createComparison``` Creates a composition of all three images as output (default: true)
* ```compareLeftToRight``` Creates comparison-composition from left to right, otherwise it lets decide the app on what is best
* ```compareTopToBottom``` Creates comparison-composition from top to bottom, otherwise it lets decide the app on what is best
* ```hShift``` Horizontal shift for possible antialiasing (default: 2) Set to 0 to turn this off.
* ```vShift``` Vertical shift for possible antialiasing (default: 2) Set to 0 to turn this off.
* ```hideShift``` Uses the background color for "highlighting" shifts. (default: false)


####Logging

By default, the logger doesn't log events anywhere, but you can change this behavior by overwriting ```blinkDiff.log```:

```javascript
var blinkDiff = new BlinkDiff({
    ...
});

blinkDiff.log = function (text) {
    // Do whatever you want to do
};

...
```


##Examples

There are some examples in the ```examples``` folder, in which I used screenshots of Wikipedia to check for visual regressions (and made some manual modifications to the dom).
You can find examples for:
* Missing DOM elements in ```hidden_regression```
* Disrupted sorting in ```sorting_regression```
* Color changes in ```style_regression```
* Text capitalization in ```text_regression```

All screenshots were compared to ```wikipedia_approved.png```, a previously approved screenshot without a regression.
Each of the regression has the screenshot and the output result, highlighting the differences.

##Results
![Conversion](https://raw.githubusercontent.com/yahoo/blink-diff/master/images/conversion.png)

##API-Documentation

Generate the documentation with following command:
```shell
npm run docs
```
The documentation will be generated in the ```docs``` folder of the module root.

##Tests

Run the tests with the following command:
```shell
npm run test
```
The code-coverage will be written to the ```coverage``` folder in the module root.


##Project Naming
The name comes from the Blink comparator that was used in Astronomy to recognize differences in multiple photos, taking a picture of the same area in the sky over consecutive days, months, or years. Most notably, it was used to discover Pluto.

##Third-party libraries

The following third-party libraries are used by this module:

###Dependencies
* promise: https://github.com/then/promise
* pngjs-image: https://github.com/yahoo/pngjs-image

###Dev-Dependencies
* chai: http://chaijs.com
* istanbul: https://github.com/gotwarlost/istanbul
* mocha: https://github.com/visionmedia/mocha
* yuidocjs: https://github.com/yui/yuidoc

##License

The MIT License

Copyright 2014 Yahoo Inc.
