import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
  name?: string;
  id?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ children, className = "", name = "", id = "", ...props }, ref) {
    return (
      <select
        ref={ref}
        name={name}
        id={id}
        className={`appearance-none px-3 py-[14px] rounded-[30px] w-full block outline-none border bg-[#ffffff1b] text-white pl-[25px] __text custom_input_component ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export default Select;
