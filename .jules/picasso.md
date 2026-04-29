# Picasso UX Improvements

## Refactoring `xor.md` and `xor.js`
- Replaced the deprecated `document.execCommand("copy")` API with the modern `navigator.clipboard.writeText()` API for clipboard operations.
- Added `aria-required="true"` and visual indicator (`<span style="color: red;" aria-hidden="true">*</span>`) to the original code input to assist screen readers and users.
- Added descriptive `aria-label`s to the "Generieren", "Löschen", and "Kopieren" buttons.
- Included `aria-readonly="true"` to the generated confirmation code input to signify to screen readers that the value shouldn't be edited.
- Improved JS performance by caching DOM element references (`origCodeInput`, `calcCodeInput`, `copyBtn`) during the `DOMContentLoaded` event instead of repeatedly querying them inside functions.
- Attached `calculateXor`, `clearAll`, and `copyResult` to the `window` object since they are invoked from HTML inline `onClick` attributes.

## Refactoring `fec.md` and `fec.js`
- Added `aria-required="true"` and visual indicator (`<span style="color: red;" aria-hidden="true">*</span>`) to the VIN and VCRN inputs in `fec.md` for better accessibility.
- Cached DOM references (`vinInputEl`, `vcrnInputEl`, `codesContainerEl`, `jumbotronEl`) at the beginning of the `DOMContentLoaded` handler to prevent repetitive DOM traversals.
- Updated the generated textareas to include an `aria-label` describing the specific code they contain.
- Updated the click handler on the textareas to automatically copy the code to the user's clipboard using `navigator.clipboard.writeText()` alongside selecting the text, providing immediate utility and feedback.
