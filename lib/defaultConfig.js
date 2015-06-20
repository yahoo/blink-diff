module.exports = {

	debug: true,
	verbose: false,

	imageA: {
		image: "",
		crop: {
			left: 0,
			top: 0,
			width: 100,
			height: 100
		}
	},
	imageB: {
		image: "",
		crop: {
			left: 0,
			top: 0,
			width: 100,
			height: 100
		}
	},

	comparisons: [
		{
			type: 'structure',

			selector: "body div.test", // *

			anchors:[
				{
					type: "width", // height, left, right, top, bottom, horizontal, vertical
					position: "absolute", // relative
					threshold: {
						type: 'pixel',
						value: 5
					}
				}
			],

			limits: [
				{
					type: "min", // max
					context: "width", // height
					value: 50
				}
			]
		},
		{
			type: 'pixel',
			colorDelta: 5,

			gamma: {
				red: 0,
				green: 0,
				blue: 0
			},
			perceptual: true,
			filters: ['blur'],

			shift: {
				active: true,
				horizontal: 2,
				vertical: 2,
				visible: true
			},

			blockOuts: [
				{
					visible: true,
					area: {
						left: 0,
						top: 0,
						width: 100,
						height: 100
					},
					color: {
						red: 0,
						green: 0,
						blue: 0,
						alpha: 0,
						opacity: 0
					}
				}
			],

			areaImageA: {
				left: 0,
				top: 0,
				width: null,
				height: null
			},
			areaImageB: {
				left: 0,
				top: 0,
				width: null,
				height: null
			}
		}
	],

	threshold: {
		type: 'pixel',
		value: 500
	},

	diffColor: {
		red: 0,
		green: 0,
		blue: 0,
		alpha: 0,
		opacity: 0
	},

	backgroundColor: {
		red: 0,
		green: 0,
		blue: 0,
		alpha: 0,
		opacity: 0
	},
	ignoreColor: {
		red: 0,
		green: 0,
		blue: 0,
		alpha: 0,
		opacity: 0
	},

	output: {
		imagePath: "",
		limit: OUTPUT_DIFFERENT,
		composition: COMPOSITION_AUTO,
		copyImage: COPY_IMAGE_A
	}
};
