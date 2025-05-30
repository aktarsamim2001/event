import { forwardRef } from "react";

const Input = forwardRef(
  ({ className, type = "text", name = "", id = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        className={`px-3 py-3.5 rounded-[30px] w-full block outline-none bg-[#FFFFFF26] text-white pl-[25px] __text border custom_input_component ${className}`}
        {...props}
      />
    );
  }
);

export default Input;
