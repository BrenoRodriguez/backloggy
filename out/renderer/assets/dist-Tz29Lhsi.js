import { A as require_jsx_runtime, F as require_react } from "./index-B6waIkEG.js";
/**
* @license lucide-react v0.555.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
};
/**
* @license lucide-react v0.555.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
var import_react = require_react();
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
/**
* @license lucide-react v0.555.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
var Star = createLucideIcon("star", [["path", {
	d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
	key: "r04s7s"
}]]);
var import_jsx_runtime = require_jsx_runtime();
var useHandleClick = () => {
	const handleClick = (ev, index, isReadonly = true, onChange) => {
		if (isReadonly || !onChange) return;
		const rectangle = ev.currentTarget.getBoundingClientRect();
		onChange(index + (ev.clientX - rectangle.left < rectangle.width / 2 ? .5 : 1));
	};
	return { handleClick };
};
var useHandleMouseMove = () => {
	const [hoverValue, setHoverValue] = (0, import_react.useState)(null);
	const handleMouseMove = (ev, index, isReadonly = true) => {
		if (isReadonly) return;
		const rectangle = ev.currentTarget.getBoundingClientRect();
		setHoverValue(index + (ev.clientX - rectangle.left < rectangle.width / 2 ? .5 : 1));
	};
	const handleMouseLeave = (isReadonly = true) => {
		if (isReadonly) return;
		setHoverValue(null);
	};
	return {
		hoverValue,
		handleMouseMove,
		handleMouseLeave
	};
};
var getStarType = (rating, index) => {
	const roundedRating = Math.round(rating * 2) / 2;
	const half = .5;
	if (roundedRating >= index + 1) return "full";
	if (roundedRating >= index + half) return "half";
	return "empty";
};
var EmptyStar = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
		...props,
		className: "empty-star"
	});
};
var FullStar = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
		...props,
		className: "full-star"
	});
};
var HalfFullStar = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "half-star-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStar, { ...props }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "half-filled-star-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
				...props,
				className: "half-filled-star"
			})
		})]
	});
};
var Rating = ({ starAmount = 5, defaultValue = 0, isReadonly = true, onChange }) => {
	const { handleClick } = useHandleClick();
	const { handleMouseMove, handleMouseLeave } = useHandleMouseMove();
	const stars = Array.from({ length: Math.round(starAmount) });
	const keysRef = (0, import_react.useRef)(Array.from({ length: Math.round(starAmount) }, () => crypto.randomUUID()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rating-container",
		children: stars.map((_, index) => {
			const starType = getStarType(defaultValue, index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { cursor: isReadonly ? "cursor-default" : "cursor-pointer" },
				onClick: (ev) => handleClick(ev, index, isReadonly, onChange),
				onMouseMove: (ev) => handleMouseMove(ev, index, isReadonly),
				onMouseLeave: () => handleMouseLeave(isReadonly),
				children: starType === "full" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullStar, {}) : starType === "half" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HalfFullStar, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyStar, {})
			}, keysRef.current[index]);
		})
	});
};
export { Rating as t };
