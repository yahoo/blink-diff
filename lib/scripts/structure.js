module.exports = function () {

	function versionInfo () {
		return {
			major: 1,
			minor: 0
		};
	}

	function deviceInfo () {
		return {
			userAgent: window.navigator.userAgent,

			app: {
				codeName: window.navigator.appCodeName,
				name: window.navigator.appName,
				version: window.navigator.appVersion,
				buildId: window.navigator.buildID
			},

			languages: window.navigator.languages || [window.navigator.language],

			product: {
				name: window.navigator.product,
				sub: window.navigator.productSub
			},
			vendor: {
				name: window.navigator.vendor,
				sub: window.navigator.vendorSub
			},

			screen: {
				pixelRatio: window.devicePixelRatio || 1,
				availableWidth: window.screen.availWidth,
				availableHeight: window.screen.availHeight,
				colorDepth: window.screen.colorDepth,
				width: window.screen.width,
				height: window.screen.height,
				fullScreen: window.fullScreen
			}
		}
	}

	function documentInfo () {
		var de = document.documentElement,
			body = document.body,
			result = {};

		result.title = document.title;
		result.url = window.location + '';
		result.referrer = document.referrer;

		result.size = {
			width: Math.max(body.scrollWidth, body.offsetWidth, de.clientWidth, de.scrollWidth, de.offsetWidth),
			height: Math.max(body.scrollHeight, body.offsetHeight, de.clientHeight, de.scrollHeight, de.offsetHeight)
		}
	}

	function viewPortInfo () {
		var el = document.createElement('div'),
			de = document.documentElement,
			body = document.body,
			result = {};

		// Get current scroll-position
		result.x = window.pageXOffset || body.scrollLeft || de.scrollLeft;
		result.y = window.pageYOffset || body.scrollTop || de.scrollTop;

		// Get current view-port size
		el.style.position = "fixed";
		el.style.top = 0;
		el.style.left = 0;
		el.style.bottom = 0;
		el.style.right = 0;
		de.insertBefore(el, de.firstChild);
		result.width = el.offsetWidth;
		result.height = el.offsetHeight;
		de.removeChild(el);

		return result;
	}

	function domInfo () {

		var capturedTags = ["A", "SPAN", "OL", "UL", "LI", "HEADER", "FOOTER", "NAV", "ARTICLE", "SECTION", "ASIDE", "DIV", "APPLET", "CANVAS", "VIDEO", "TABLE", "DETAILS", "SUMMARY", "IFRAME", "MENU", "MAIN", "FIGURE", "FIELDSET"];

		function loadDOMNode (inputNode, parentNode) {

			var nodes, length, offset, newNode;

			if (capturedTags.indexOf(inputNode.tagName) !== -1) {

				newNode = {};
				newNode.id = (inputNode.id && inputNode.id.length > 0) ? inputNode.id : null;
				newNode.tagName = inputNode.tagName;
				newNode.classes = (inputNode.className && inputNode.className.length > 0) ? inputNode.className.split(/\s/) : [];
				newNode.width = inputNode.offsetWidth;
				newNode.height = inputNode.offsetHeight;

				offset = absoluteOffset(inputNode);
				newNode.x = offset.x;
				newNode.y = offset.y;

				newNode.nodes = [];

				if ((newNode.width > 0) && (newNode.height > 0)) {
					parentNode.nodes.push(newNode);
					parentNode = newNode;
				}
			}

			nodes = inputNode.children;
			length = inputNode.childElementCount;

			if (nodes && length) {
				for (var i = 0; i < length; i++) {
					loadDOMNode(nodes[i], parentNode);
				}
			}

			return parentNode;
		}

		function absoluteOffset (element) {

			var x = 0, y = 0;

			do {
				x += element.offsetLeft || 0;
				y += element.offsetTop || 0;
				element = element.offsetParent;
			} while (element);

			return {
				x: x, y: y
			};
		}

		var node = {nodes:[]};

		loadDOMNode(document.body, node);

		return node;
	}

	return JSON.stringify({
		version: versionInfo(),
		device: deviceInfo(),
		document: documentInfo(),
		viewPort: viewPortInfo(),
		screenshot: {
			stitched: false,
			x: 0,
			y: 0,
			width: null,
			height: null
		},
		dom: domInfo()
	});
};
