const Button = ({
  label,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-orange-400 hover:bg-orange-500 text-white focus:ring-orange-500",
    outline:
      "border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white focus:ring-orange-500 bg-transparent",
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export { Button };
