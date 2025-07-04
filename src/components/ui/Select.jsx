import { forwardRef } from "react";
import { IconArrowDown } from "@/assets";

const Select = forwardRef(
  (
    {
      options = [],
      value,
      onChange,
      placeholder = "Select an option",
      label,
      error,
      disabled = false,

      className = "",
      name,
      id,
      required = false,
    },
    ref
  ) => {
    const selectClasses = `
    appearance-none
    block
    w-full
    bg-white
    border
    rounded-md
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-opacity-50
    transition-colors
    duration-200
    p-2
    ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
    ${error ? "pr-10" : "pr-10"}
    ${className}
  `
      .trim()
      .replace(/\s+/g, " ");

    const iconClasses = `
    absolute
    right-3
    top-1/2
    transform
    -translate-y-1/2
    pointer-events-none
    transition-transform
    duration-200
    ${disabled ? "text-gray-400" : "text-orange-500"}

  `
      .trim()
      .replace(/\s+/g, " ");

    const handleChange = (e) => {
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id || name}
            className={`
            block
            text-sm
            font-medium
            mb-2
            ${error ? "text-red-700" : "text-gray-700"}
            ${required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""}
          `
              .trim()
              .replace(/\s+/g, " ")}
          >
            {label}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          <select
            ref={ref}
            id={id || name}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            className={selectClasses}
          >
            {/* Placeholder option */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {/* Options */}
            {options.map((option, index) => {
              // Handle both string options and object options
              if (typeof option === "string") {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              } else if (
                typeof option === "object" &&
                option.value !== undefined
              ) {
                return (
                  <option key={option.value || index} value={option.value}>
                    {option.label || option.value}
                  </option>
                );
              }
              return null;
            })}
          </select>

          {/* Dropdown Icon */}
          <IconArrowDown className={iconClasses} />
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-2 text-red-600 text-sm">{error.message || error}</p>
        )}
      </div>
    );
  }
);

export { Select };
