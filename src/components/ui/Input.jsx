import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      name,
      type = "text",
      error,
      placeholder,
      value,
      onChange,
      disabled = false,
      className = "",
      label,
      ...props
    },
    ref
  ) => {
    const baseClasses = `
    w-full px-3 py-2 border rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
    disabled:bg-gray-100 disabled:cursor-not-allowed
    transition-colors duration-200
    [&::-webkit-inner-spin-button]:appearance-none 
    [&::-webkit-outer-spin-button]:appearance-none 
    [appearance:textfield]
    ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
    ${className}
  `;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className="block mb-1 font-medium text-gray-700 text-sm"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
          {...props}
        />

        {error && (
          <p className="mt-1 text-red-500 text-sm">
            {typeof error === "string" ? error : error.message}
          </p>
        )}
      </div>
    );
  }
);

export { Input };
