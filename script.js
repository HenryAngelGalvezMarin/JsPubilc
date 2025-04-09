// Store the original constructor
const OriginalIntlNumberFormat = Intl.NumberFormat;

// Replace with your custom implementation
Intl.NumberFormat = function (locale, options) {
  // If this is CLP currency formatting with code display
  if (options && options.currency === 'CLP') {
    // Create a modified version that uses symbol display instead
    const modifiedOptions = { ...options };
    modifiedOptions.currencyDisplay = "symbol";

    // Use the original formatter but with our modified options
    const formatter = new OriginalIntlNumberFormat(locale, modifiedOptions);

    // Create a wrapper object with a modified format method
    return {
      format: function (value) {
        // Format with the original formatter
        let result = formatter.format(value);
        // Replace CLP with $
        result = result.replace(/CLP/g, '$');
        // Replace commas with dots for thousands separators
        result = result.replace(/,/g, '.');
        return result;
      },
      // Pass through other methods as needed
      formatToParts: formatter.formatToParts.bind(formatter),
      resolvedOptions: formatter.resolvedOptions.bind(formatter)
    };
  }

  // For non-CLP currencies, use the original implementation
  return new OriginalIntlNumberFormat(locale, options);
};
