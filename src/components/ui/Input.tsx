import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  iconSrc?: string;
  placeholder?: string;
}

const Input = ({ value, onChange, iconSrc, placeholder }: InputProps) => {
  return (
    <div className="custom-input">
      {iconSrc && <img src={iconSrc} alt="Icon" />}

      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
