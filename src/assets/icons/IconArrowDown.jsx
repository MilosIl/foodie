const IconArrowDown = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={20}
      width={20}
      className={`inline-block ${className}`}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M10 8L14 8V10L8 16L2 10V8H6V0L10 4.76995e-08V8Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
};

export { IconArrowDown };
