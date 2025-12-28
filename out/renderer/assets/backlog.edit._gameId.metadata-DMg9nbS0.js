import { A as require_jsx_runtime, t as useSettings } from "./index-B6waIkEG.js";
import { i as useFormContext, t as Controller } from "./index.esm-C44qhG5i.js";
import { t as AutoCompleteField } from "./AutoCompleteField-CkrnbW3j.js";
var import_jsx_runtime = require_jsx_runtime();
function EditGameMetadataSection() {
	const { control, formState: { errors } } = useFormContext();
	const { metadata1, metadata2, metadata3, metadata4, metadata5 } = useSettings();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "h-[532px] w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "metadata1",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: metadata1.label,
					options: metadata1.presets,
					fieldName: "editGameMetadata1",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.metadata1?.message
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "metadata2",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: metadata2.label,
					options: metadata2.presets,
					fieldName: "editGameMetadata2",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.metadata2?.message
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "metadata3",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: metadata3.label,
					options: metadata3.presets,
					fieldName: "editGameMetadata3",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.metadata3?.message
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "metadata4",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: metadata4.label,
					options: metadata4.presets,
					fieldName: "editGameMetadata4",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.metadata4?.message
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controller, {
				control,
				name: "metadata5",
				render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutoCompleteField, {
					label: metadata5.label,
					options: metadata5.presets,
					fieldName: "editGameMetadata5",
					value: field.value,
					onChange: field.onChange,
					errorMessage: errors.metadata5?.message
				})
			})
		]
	});
}
export { EditGameMetadataSection as component };
