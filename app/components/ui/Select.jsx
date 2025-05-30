import { forwardRef } from "react";

const Select = forwardRef(
  ({ children, className, type, name, id, ...props }, ref) => {
    return (
      <select
        ref={ref}
        name={name || ""}
        id={id || ""}
        className={`appearance-none px-3 py-[14px] rounded-[30px] w-full block outline-none border bg-[#ffffff1b] text-white pl-[25px] __text custom_input_component ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);

export default Select;
