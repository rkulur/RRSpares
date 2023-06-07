import React, { useState } from "react";
import { DropDownOption as Option } from "../../../utils/interfaces";
import { useDropDownSelect } from "../../../Context/DropDownContext";

const DropdownSelect = ({
  options,
  selectValue,
}: {
  options: Option[];
  selectValue: React.MutableRefObject<HTMLSelectElement | null>;
}) => {
  const { selectedOption, updateSelectedOption } = useDropDownSelect()!;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateSelectedOption(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" ref={selectValue} value={selectedOption} onChange={handleChange}>
        {/* <option value="">-- Select --</option> */}
        {options.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSelect;
