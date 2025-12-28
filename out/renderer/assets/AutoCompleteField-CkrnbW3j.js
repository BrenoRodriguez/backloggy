import { A as require_jsx_runtime, F as require_react, _ as Input, g as Field, h as FieldError } from "./index-B6waIkEG.js";
const filterSuggestions = (query, options) => {
	return options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));
};
var import_react = require_react();
const useAutoCompleteCore = (options) => {
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const [highlightedIndex, setHighlightedIndex] = (0, import_react.useState)(-1);
	const inputRef = (0, import_react.useRef)(null);
	const resetSuggestions = () => {
		setSuggestions([]);
		setHighlightedIndex(-1);
	};
	const updateFilteredSuggestions = (query) => {
		if (!query) return resetSuggestions();
		const newSuggestions = filterSuggestions(query, options);
		if (newSuggestions.some((suggestion) => suggestion.toLowerCase() === query.toLowerCase())) return resetSuggestions();
		setSuggestions(newSuggestions);
		setHighlightedIndex(0);
	};
	const highlightPreviousOption = (event) => {
		event.preventDefault();
		setHighlightedIndex((currentIndex) => currentIndex > 0 ? currentIndex - 1 : currentIndex);
	};
	const highlightNextOption = (event) => {
		event.preventDefault();
		setHighlightedIndex((currentIndex) => currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0);
	};
	const handleBlur = () => {
		const timeoutId = setTimeout(resetSuggestions, 100);
		clearTimeout(timeoutId);
	};
	return {
		suggestions,
		highlightedIndex,
		inputRef,
		updateFilteredSuggestions,
		handleBlur,
		highlightPreviousOption,
		highlightNextOption,
		resetSuggestions
	};
};
const useAutoCompleteInput = (options, onChange) => {
	const { suggestions, highlightedIndex, inputRef, updateFilteredSuggestions, handleBlur, highlightPreviousOption, highlightNextOption, resetSuggestions } = useAutoCompleteCore(options);
	const selectSuggestion = (option) => {
		if (!inputRef?.current) return;
		onChange(option);
		inputRef.current.blur();
		resetSuggestions();
	};
	const handleEnter = (event) => {
		event.preventDefault();
		if (highlightedIndex < 0 || suggestions.length <= 0) return;
		selectSuggestion(suggestions[highlightedIndex]);
	};
	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") return highlightPreviousOption(event);
		if (event.key === "ArrowDown") return highlightNextOption(event);
		if (event.key === "Enter") return handleEnter(event);
	};
	return {
		suggestions,
		highlightedIndex,
		inputRef,
		updateFilteredSuggestions,
		selectSuggestion,
		handleKeyDown,
		handleBlur
	};
};
const useMultiSelect = (options, selectedItems, onChange) => {
	const { inputRef, highlightPreviousOption, highlightNextOption, resetSuggestions, ...otherProperties } = useAutoCompleteCore(options);
	const selectSuggestion = (option) => {
		if (!inputRef?.current) return;
		inputRef.current.value = option;
		inputRef.current.focus();
		resetSuggestions();
	};
	const handleEnter = (event) => {
		event.preventDefault();
		const value = event.currentTarget.value.trim();
		const isAlreadySelected = selectedItems.some((item) => item.toLowerCase().includes(value.toLowerCase()));
		if (!value || isAlreadySelected) return;
		onChange([...selectedItems, value]);
		event.currentTarget.value = "";
	};
	const handleKeyDown = (event) => {
		if (event.key === "ArrowUp") return highlightPreviousOption(event);
		if (event.key === "ArrowDown") return highlightNextOption(event);
		if (event.key === "Enter") return handleEnter(event);
	};
	return {
		inputRef,
		selectSuggestion,
		handleKeyDown,
		...otherProperties
	};
};
const useSelectedItems = (selectedItems, onChange) => {
	const removeItem = (itemToRemove) => () => {
		onChange(selectedItems.filter((item) => item !== itemToRemove));
	};
	return { removeItem };
};
var import_jsx_runtime = require_jsx_runtime();
const SuggestionsOption = ({ option, isHighlightedIndex, selectOption }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		role: "option",
		"aria-selected": isHighlightedIndex,
		onClick: () => selectOption(option),
		children: option
	});
};
const SuggestionsContainer = ({ options, highlightedIndex, selectOption }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: options.map((option, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionsOption, {
		option,
		isHighlightedIndex: highlightedIndex === index,
		selectOption
	}, `${option + index}`)) });
};
const SuggestionsDropdown = ({ options, highlightedIndex, isVisible, selectOption }) => {
	if (!isVisible) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionsContainer, {
		options,
		highlightedIndex,
		selectOption
	});
};
const AutoCompleteInput = ({ options, onChange, hasError, ...props }) => {
	const { suggestions, highlightedIndex, inputRef, updateFilteredSuggestions, handleKeyDown, handleBlur, selectSuggestion } = useAutoCompleteInput(options, onChange);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			ref: inputRef,
			onChange: (event) => {
				updateFilteredSuggestions(event.target.value);
				onChange(event.target.value);
			},
			onKeyDown: handleKeyDown,
			onBlur: handleBlur,
			hasError,
			...props
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestionsDropdown, {
			options: suggestions,
			highlightedIndex,
			isVisible: suggestions.length > 0,
			selectOption: selectSuggestion
		})]
	});
};
const AutoCompleteField = ({ label, fieldName, errorMessage, options, onChange, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [
		label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			htmlFor: fieldName,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteInput, {
			...props,
			options,
			onChange,
			hasError: errorMessage
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errorMessage })
	] });
};
export { useMultiSelect as i, SuggestionsDropdown as n, useSelectedItems as r, AutoCompleteField as t };
