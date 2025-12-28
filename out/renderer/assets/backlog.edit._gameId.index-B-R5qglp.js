import { A as require_jsx_runtime, S as cva, T as X, _ as Input, g as Field, h as FieldError, m as InputField } from "./index-B6waIkEG.js";
import { i as useFormContext, t as Controller } from "./index.esm-C44qhG5i.js";
import { i as useMultiSelect, n as SuggestionsDropdown, r as useSelectedItems, t as AutoCompleteField } from "./AutoCompleteField-CkrnbW3j.js";
import { n as GAME_STATUS_SUGGESTIONS, t as GAME_PLATFORM_SUGGESTIONS } from "./suggestions-DxszQaZN.js";
var import_jsx_runtime = require_jsx_runtime();
var selectedItemsOptionVariants = cva("", {
	variants: { variant: { default: "flex cursor-default items-center justify-center gap-1 text-nowrap rounded-sm border border-stone-800 bg-stone-900/40 px-2 py-0.5 text-base transition-colors duration-200 ease-in hover:bg-stone-900" } },
	defaultVariants: { variant: "default" }
});
const SelectedItemsOption = ({ children, removeItem, variant }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: selectedItemsOptionVariants({ variant }),
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: removeItem,
			className: "cursor-pointer transition-colors duration-200 ease-in hover:text-accent-light",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
				strokeWidth: 1,
				size: 20
			})
		})]
	});
};
var selectedItemsVariants = cva("", {
	variants: { variant: { default: "flex gap-1" } },
	defaultVariants: { variant: "default" }
});
const SelectedItems = ({ selectedItems, onChange, variant }) => {
	const { removeItem } = useSelectedItems(selectedItems, onChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: selectedItemsVariants({ variant }),
		children: selectedItems.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectedItemsOption, {
			removeItem: removeItem(item),
			variant,
			children: item
		}, `${item + index}`))
	});
};
const MultiSelect = ({ options, selectedItems, onChange, ...props }) => {
	const { suggestions, highlightedIndex, inputRef, updateFilteredSuggestions, handleKeyDown, handleBlur, selectSuggestion } = useMultiSelect(options, selectedItems, onChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref: inputRef,
			...props,
			onChange: (event) => updateFilteredSuggestions(event.target.value),
			onKeyDown: handleKeyDown,
			onBlur: handleBlur
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionsDropdown, {
			highlightedIndex,
			options,
			selectOption: selectSuggestion,
			isVisible: suggestions.length > 0
		})]
	});
};
MultiSelect.SelectedItems = SelectedItems;
const MultiSelectField = ({ label, fieldName, selectedItems, options, onChange, errorMessage }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-lg",
			children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: fieldName,
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSelect.SelectedItems, {
				selectedItems,
				onChange
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSelect, {
			id: fieldName,
			onChange,
			options,
			selectedItems,
			hasError: errorMessage
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errorMessage })
	] });
};
var formRowVariants = cva("", {
	variants: { variant: { default: "flex w-full gap-4" } },
	defaultVariants: { variant: "default" }
});
const FormRow = ({ children, variant }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: formRowVariants({ variant }),
		children
	});
};
function EditGameGeneralSection() {
	const { register, control, formState: { errors } } = useFormContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "h-[532px] w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputField, {
				...register("name"),
				fieldName: "editGameName",
				label: "Name",
				className: "w-full",
				errorMessage: errors.name?.message
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputField, {
				...register("position"),
				fieldName: "editGamePosition",
				label: "Position",
				className: "w-18",
				errorMessage: errors.position?.message
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputField, {
				...register("cover"),
				fieldName: "editGameCover",
				errorMessage: errors.cover?.message,
				label: "Cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "genres",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MultiSelectField, {
					label: "Genres",
					options: [],
					selectedItems: field.value,
					onChange: field.onChange,
					fieldName: "editGameGenres",
					errorMessage: errors.genres?.message
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "status",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: "Status",
					options: GAME_STATUS_SUGGESTIONS,
					fieldName: "editGameStatus",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.status?.message
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "platform",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: "Platform",
					options: GAME_PLATFORM_SUGGESTIONS,
					fieldName: "editGamePlatform",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.platform?.message
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputField, {
				...register("length"),
				fieldName: "editGameLength",
				label: "Length",
				errorMessage: errors.length?.message
			})] })
		]
	});
}
export { EditGameGeneralSection as component };
