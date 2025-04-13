"use client";

import { cn } from "@/lib/utils";
import { forwardRef, useState } from "react";
import Select, { SingleValue, GroupBase, SelectInstance } from "react-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  list: SelectOption[];
  errors?: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const SelectInput = forwardRef<
  SelectInstance<SelectOption, false, GroupBase<SelectOption>>,
  SelectInputProps
>(
  (
    {
      name: selectName,
      list,
      errors,
      defaultValue = "",
      disabled = false,
      onChange,
    },
    ref
  ) => {
    const hasError = (value?: string[]) => (value ? true : false);

    const [selectedValue, setSelectedValue] = useState<SelectOption | null>(
      () => {
        if (defaultValue) {
          return list.find((option) => option.value === defaultValue) || null;
        }
        return null;
      }
    );

    const handleChange = (selectedOption: SingleValue<SelectOption>) => {
      setSelectedValue(selectedOption);
      if (onChange) {
        onChange(selectedOption ? selectedOption.value : "");
      }
    };

    return (
      <div className="my-2">
        <label
          htmlFor={selectName}
          className="block text-xs text-gray-300 mb-1"
        >
          {selectName.charAt(0).toUpperCase() + selectName.slice(1)}
        </label>

        <Select
          ref={ref}
          options={list}
          value={selectedValue}
          onChange={handleChange}
          closeMenuOnSelect
          closeMenuOnScroll
          placeholder={`Select ${selectName}`}
          name={selectName}
          isSearchable
          isClearable
          isDisabled={disabled}
          classNamePrefix="react-select"
          className={cn(
            "w-full bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none focus:border-yellow-400",
            errors &&
              "mb-2 focus:border-red-500 focus:ring-red-500 border-red-500 ring-red-500"
          )}
          styles={{
            control: (base, { isFocused }) => ({
              ...base,
              backgroundColor: "transparent",
              borderColor: hasError(errors)
                ? "red"
                : isFocused
                ? "#facc15"
                : "inherit",
              borderWidth: isFocused ? "1px" : "0px",
              boxShadow: "none",
              padding: "4px",
              cursor: "pointer",
              borderRadius: "5px",
              outline: "none",
              ":hover": {
                borderColor: "#facc15",
                boxShadow: "none",
              },
              fontSize: "14px",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#ccc",
              fontSize: "14px",
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "inherit",
              borderColor: "inherit",
              boxShadow: "none",
              padding: "2px",
              fontSize: "14px",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
              fontSize: "14px",
            }),
            option: (styles, { isDisabled, isFocused, isSelected }) => ({
              ...styles,
              padding: "8px",
              marginTop: "4px",
              cursor: "pointer",
              borderRadius: "4px",
              backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? "rgba(255, 255, 255, 0.8)"
                : isFocused
                ? "rgba(255, 255, 255, 0.2)"
                : undefined,
              color: isDisabled
                ? "#ccc"
                : isSelected
                ? "black"
                : isFocused
                ? "white"
                : "white",
              ":hover": {
                backgroundColor: !isDisabled
                  ? isSelected
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(255, 255, 255, 0.2)"
                  : undefined,
              },
            }),
            indicatorSeparator: (base) => ({
              ...base,
              backgroundColor: "#4b5563",
            }),
          }}
        />

        {errors?.map((val, index) => (
          <p key={index} className="text-red-500 text-xs m-1">
            {val}
          </p>
        ))}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;