import { A as require_jsx_runtime, F as require_react, S as cva, b as twMerge, g as Field, h as FieldError } from "./index-B6waIkEG.js";
import { i as useFormContext, t as Controller } from "./index.esm-C44qhG5i.js";
import { t as Rating } from "./dist-Tz29Lhsi.js";
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var textAreaVariants = cva("", {
	variants: { variant: { default: "w-full rounded-sm border border-stone-800 bg-stone-900/40 px-2 py-1 text-lg transition-all duration-200 ease-in hover:border-accent-light focus:border-accent-light focus:outline-none disabled:cursor-not-allowed disabled:select-none disabled:border-stone-900 disabled:text-stone-500 disabled:opacity-80" } },
	defaultVariants: { variant: "default" }
});
const TextArea = (0, import_react.forwardRef)(({ variant, className, hasError, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		ref,
		className: twMerge(textAreaVariants({ variant }), hasError && "", className)
	});
});
const TextAreaField = ({ fieldName, label, errorMessage, className, ref, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: fieldName,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
			ref,
			...props,
			id: fieldName,
			className
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errorMessage })
	] });
};
function EditGameReviewSection() {
	const { control, register, formState: { errors } } = useFormContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "h-[532px] w-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
			control,
			name: "reviewScore",
			render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: "editGameReview",
				children: "Review"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rating, {
				defaultValue: field.value,
				onChange: field.onChange,
				isReadonly: false
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextAreaField, {
			...register("notes"),
			fieldName: "editGameNotes",
			label: "Notes",
			errorMessage: errors.notes?.message,
			rows: 8
		})]
	});
}
export { EditGameReviewSection as component };
