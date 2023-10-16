// ImageDropdown.tsx
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

interface Option {
  value: string;
  label: string;
  iconUrl: string;
  count: number;
}

interface ImageDropdownProps {
  options: Option[];
  defaultIcon: string;
  onChange: (value: string) => void;
}

const ImageDropdown: React.FC<ImageDropdownProps> = ({
  options,
  defaultIcon,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  const totalCount = options.reduce((acc, option) => {
    return acc + option.count;
  }, 0);

  const optionsClass = isOpen ? "options active" : "options";

  return (
    <div className={`custom-dropdown ${isOpen ? "active" : ""}`}>
      <div className="select-btn" onClick={() => setIsOpen(!isOpen)}>
        <img
          src={
            options.find((option) => option?.value === selectedOption)
              ?.iconUrl || defaultIcon
          }
          alt={selectedOption?.toString()}
        />
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {
        <ul className={optionsClass}>
          <li
            className="option"
            onClick={() => handleOptionClick("")}
            key="all"
          >
            <div className="label-block">
              <input
                type="radio"
                name="custom-dropdown-radio"
                value=""
                checked={selectedOption === ""}
                onChange={() => handleOptionClick("")}
              />
              <img src={defaultIcon} alt="All" />
              <span className="option-text">All</span>
            </div>
            <span className="count-box">{totalCount}</span>
          </li>
          {options?.map((option) => (
            <li
              key={option?.value}
              className="option"
              onClick={() => handleOptionClick(option?.value)}
            >
              <div className="label-block">
                <input
                  type="radio"
                  name="custom-dropdown-radio"
                  value={option?.value}
                  checked={selectedOption === option?.value}
                  onChange={() => handleOptionClick(option?.value)}
                />
                <img src={option?.iconUrl} alt={option?.label.toString()} />
                <span className="option-text">{option?.label}</span>
              </div>
              <span className="count-box">{option?.count}</span>
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default ImageDropdown;
