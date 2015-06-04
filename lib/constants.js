/**
 * @class constants
 * @type {object}
 */
module.exports = {

	/**
	 * Anchor-type left
	 *
	 * @static
	 * @property ANCHOR_TYPE_LEFT
	 * @type {string}
	 */
	ANCHOR_TYPE_LEFT: 'left',

	/**
	 * Anchor-type right
	 *
	 * @static
	 * @property ANCHOR_TYPE_RIGHT
	 * @type {string}
	 */
	ANCHOR_TYPE_RIGHT: 'right',

	/**
	 * Anchor-type top
	 *
	 * @static
	 * @property ANCHOR_TYPE_TOP
	 * @type {string}
	 */
	ANCHOR_TYPE_TOP: 'top',

	/**
	 * Anchor-type bottom
	 *
	 * @static
	 * @property ANCHOR_TYPE_BOTTOM
	 * @type {string}
	 */
	ANCHOR_TYPE_BOTTOM: 'bottom',

	/**
	 * Anchor-type width
	 *
	 * @static
	 * @property ANCHOR_TYPE_WIDTH
	 * @type {string}
	 */
	ANCHOR_TYPE_WIDTH: 'width',

	/**
	 * Anchor-type height
	 *
	 * @static
	 * @property ANCHOR_TYPE_HEIGHT
	 * @type {string}
	 */
	ANCHOR_TYPE_HEIGHT: 'height',

	/**
	 * Anchor-type horizontal (includes width, left, and right)
	 *
	 * @static
	 * @property ANCHOR_TYPE_HORIZONTAL
	 * @type {string}
	 */
	ANCHOR_TYPE_HORIZONTAL: 'horizontal',

	/**
	 * Anchor-type vertical (includes height, top, and bottom)
	 *
	 * @static
	 * @property ANCHOR_TYPE_VERTICAL
	 * @type {string}
	 */
	ANCHOR_TYPE_VERTICAL: 'vertical',


	/**
	 * Relative positioning
	 *
	 * @static
	 * @property ANCHOR_POSITION_RELATIVE
	 * @type {string}
	 */
	ANCHOR_POSITION_RELATIVE: 'relative',

	/**
	 * Absolute positioning
	 *
	 * @static
	 * @property ANCHOR_POSITION_ABSOLUTE
	 * @type {string}
	 */
	ANCHOR_POSITION_ABSOLUTE: 'absolute',


	/**
	 * Limit-type min
	 *
	 * @static
	 * @property LIMIT_TYPE_MIN
	 * @type {string}
	 */
	LIMIT_TYPE_MIN: 'min',

	/**
	 * Limit-type max
	 *
	 * @static
	 * @property LIMIT_TYPE_MAX
	 * @type {string}
	 */
	LIMIT_TYPE_MAX: 'max',


	/**
	 * Limit-context left
	 *
	 * @static
	 * @property LIMIT_CONTEXT_LEFT
	 * @type {string}
	 */
	LIMIT_CONTEXT_LEFT: 'left',

	/**
	 * Limit-context right
	 *
	 * @static
	 * @property LIMIT_CONTEXT_RIGHT
	 * @type {string}
	 */
	LIMIT_CONTEXT_RIGHT: 'right',

	/**
	 * Limit-context top
	 *
	 * @static
	 * @property LIMIT_CONTEXT_TOP
	 * @type {string}
	 */
	LIMIT_CONTEXT_TOP: 'top',

	/**
	 * Limit-context bottom
	 *
	 * @static
	 * @property LIMIT_CONTEXT_BOTTOM
	 * @type {string}
	 */
	LIMIT_CONTEXT_BOTTOM: 'bottom',

	/**
	 * Limit-context width
	 *
	 * @static
	 * @property LIMIT_CONTEXT_WIDTH
	 * @type {string}
	 */
	LIMIT_CONTEXT_WIDTH: 'width',

	/**
	 * Limit-context height
	 *
	 * @static
	 * @property LIMIT_CONTEXT_HEIGHT
	 * @type {string}
	 */
	LIMIT_CONTEXT_HEIGHT: 'height',


	/**
	 * Threshold-type for pixel
	 *
	 * @static
	 * @property THRESHOLD_PIXEL
	 * @type {string}
	 */
	THRESHOLD_PIXEL: 'pixel',

	/**
	 * Threshold-type for percent of all pixels
	 *
	 * @static
	 * @property THRESHOLD_PERCENT
	 * @type {string}
	 */
	THRESHOLD_PERCENT: 'percent',


	/**
	 * Comparison-type for pixel
	 *
	 * @static
	 * @property COMPARISON_PIXEL
	 * @type {string}
	 */
	COMPARISON_PIXEL: 'pixel',

	/**
	 * Comparison-type for structure
	 *
	 * @static
	 * @property COMPARISON_STRUCTURE
	 * @type {string}
	 */
	COMPARISON_STRUCTURE: 'structure',


	/**
	 * Unknown result of the comparison
	 *
	 * @static
	 * @property RESULT_UNKNOWN
	 * @type {int}
	 */
	RESULT_UNKNOWN: 0,

	/**
	 * The images are too different
	 *
	 * @static
	 * @property RESULT_DIFFERENT
	 * @type {int}
	 */
	RESULT_DIFFERENT: 10,

	/**
	 * The images are very similar, but still below the threshold
	 *
	 * @static
	 * @property RESULT_SIMILAR
	 * @type {int}
	 */
	RESULT_SIMILAR: 20,

	/**
	 * The images are identical (or near identical)
	 *
	 * @static
	 * @property RESULT_IDENTICAL
	 * @type {int}
	 */
	RESULT_IDENTICAL: 30,


	/**
	 * Create output when images are different
	 *
	 * @static
	 * @property OUTPUT_DIFFERENT
	 * @type {int}
	 */
	OUTPUT_DIFFERENT: 10,

	/**
	 * Create output when images are similar or different
	 *
	 * @static
	 * @property OUTPUT_SIMILAR
	 * @type {int}
	 */
	OUTPUT_SIMILAR: 20,

	/**
	 * Force output of all comparisons
	 *
	 * @static
	 * @property OUTPUT_ALL
	 * @type {int}
	 */
	OUTPUT_ALL: 100,


	/**
	 * Composition is off
	 *
	 * @static
	 * @property COMPOSITION_OFF
	 * @type {int}
	 */
	COMPOSITION_OFF: 0,

	/**
	 * Automatic composition depending on the resolutions of the images
	 *
	 * @static
	 * @property COMPOSITION_AUTO
	 * @type {int}
	 */
	COMPOSITION_AUTO: 1,

	/**
	 * Composition from left to right
	 *
	 * @static
	 * @property COMPOSITION_LEFT_TO_RIGHT
	 * @type {int}
	 */
	COMPOSITION_LEFT_TO_RIGHT: 2,

	/**
	 * Composition from top to bottom
	 *
	 * @static
	 * @property COMPOSITION_TOP_TO_BOTTOM
	 * @type {int}
	 */
	COMPOSITION_TOP_TO_BOTTOM: 3,


	/**
	 * Do not copy any image to the result
	 *
	 * @static
	 * @property COPY_IMAGE_OFF
	 * @type {int}
	 */
	COPY_IMAGE_OFF: 0,

	/**
	 * Copy image A as base for result
	 *
	 * @static
	 * @property COPY_IMAGE_A
	 * @type {int}
	 */
	COPY_IMAGE_A: 1,

	/**
	 * Copy image B as base for result
	 *
	 * @static
	 * @property COPY_IMAGE_B
	 * @type {int}
	 */
	COPY_IMAGE_B: 2
};
