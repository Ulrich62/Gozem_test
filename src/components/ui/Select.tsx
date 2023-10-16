import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
}

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div
        className={`select-header ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <span>
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
        </span>
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <ul
        className="options"
        style={{ maxHeight: isOpen ? `${options.length * 60}px` : "0" }}
      >
        {options.map((option) => (
          <li key={option.value} onClick={() => handleOptionClick(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
