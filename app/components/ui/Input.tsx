import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className = "", type = "text", name = "", id = "", ...props }, ref) {
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
Input.displayName = "Input";

export default Input;
