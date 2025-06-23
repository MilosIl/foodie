import { forwardRef } from "react";

const CheckBox = forwardRef(
  (
    {
      id,
      name,
      value,
      checked,
      onChange,
      onBlur,
      label,
      description,
      error,
      disabled = false,
      size = "medium",
      variant = "primary",
      className = "",
      labelClassName = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
      large: "w-6 h-6",
    };

    const variantClasses = {
      primary: "text-orange-500 focus:ring-orange-500",
      secondary: "text-gray-500 focus:ring-gray-500",
      success: "text-green-500 focus:ring-green-500",
      error: "text-red-500 focus:ring-red-500",
    };

    const baseClasses = `
    rounded border-gray-300 
    focus:ring-2 focus:ring-offset-2 
    transition-colors duration-200
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${error ? "border-red-500 text-red-500 focus:ring-red-500" : variantClasses[variant]}
    ${sizeClasses[size]}
  `;

    const checkboxId = id || `checkbox-${name}-${value || "default"}`;

    return (
      <div className={`flex items-start gap-2 ${className}`}>
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={baseClasses}
            {...props}
          />
        </div>

        {label && (
          <div className="flex-1">
            <label
              htmlFor={checkboxId}
              className={`
              block text-sm font-medium 
              ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 cursor-pointer"}
              ${error ? "text-red-500" : ""}
              ${labelClassName}
            `}
            >
              {label}
            </label>

            {description && (
              <p
                className={`text-xs mt-1 ${error ? "text-red-400" : "text-gray-500"}`}
              >
                {description}
              </p>
            )}

            {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

CheckBox.displayName = "CheckBox";

// Wrapper component for easier use with React Hook Form
const CheckBoxGroup = ({
  options = [],
  name,
  value = [],
  onChange,
  error,
  label,
  orientation = "vertical",
  size = "medium",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const handleChange = (optionValue, isChecked) => {
    let newValue;

    if (isChecked) {
      // Add to array if checked
      newValue = [...value, optionValue];
    } else {
      // Remove from array if unchecked
      newValue = value.filter((v) => v !== optionValue);
    }

    onChange(newValue);
  };

  const orientationClasses = {
    vertical: "flex-col space-y-2",
    horizontal: "flex-row flex-wrap gap-4",
  };

  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 font-medium text-gray-700 text-sm">
          {label}
        </label>
      )}

      <div className={`flex ${orientationClasses[orientation]}`}>
        {options.map((option) => {
          const optionValue =
            typeof option === "string" ? option : option.value;
          const optionLabel =
            typeof option === "string" ? option : option.label;
          const isChecked = value.includes(optionValue);

          return (
            <CheckBox
              key={optionValue}
              name={name}
              value={optionValue}
              checked={isChecked}
              onChange={(e) => handleChange(optionValue, e.target.checked)}
              label={optionLabel}
              size={size}
              variant={variant}
              disabled={disabled}
              error={error && !isChecked ? error : undefined}
              {...props}
            />
          );
        })}
      </div>

      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export { CheckBox, CheckBoxGroup };
