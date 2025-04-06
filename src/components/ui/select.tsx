"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Select from "react-select";

type CombinedError = {
  errors?: string[];
  message?: string;
};

interface SelectInputProps {
  name: string;
  list: { value: string; label: string }[];
  error?: CombinedError;
  defaultValue?: string;
}

export default function SelectInput(props: SelectInputProps) {
  const { name: selectName, list, error, defaultValue } = props;

  function hasError(value?: CombinedError) {
    const result = value?.errors ? true : value?.message ? true : false;
    return result;
  }

  const [selectedValue, setSelectedValue] = useState<{
    value: string;
    label: string;
  } | null>({ value: defaultValue || "", label: defaultValue || "" });

  // Define the onChange handler
  const handleChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedValue(selectedOption);
  };

  return (
    <div>
      <label htmlFor={selectName} className="block text-xs text-gray-300 mb-1">
        {selectName.charAt(0).toUpperCase() + selectName.slice(1)}
      </label>

      <Select
        options={list}
        value={selectedValue} // Controlled value
        onChange={handleChange} // Controlled onChange
        closeMenuOnSelect
        closeMenuOnScroll
        placeholder={"Select " + selectName}
        name={selectName}
        isSearchable
        isClearable
        classNamePrefix="react-select"
        className={cn(
          "w-full bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none focus:border-yellow-400",
          error?.message &&
            "border-red-500 ring-red-500 outline-none focus:outline-none",
          error?.errors &&
            "mb-2 focus:border-red-500 focus:ring-red-500 border-red-500 ring-red-500"
        )}
        styles={{
          control: (base, { isFocused }) => ({
            ...base,
            backgroundColor: "transparent",
            borderColor: hasError(error)
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
          option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              padding: "8px",
              marginTop: "4px",
              cursor: "pointer",
              borderRadius: "4px",
              backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? "rgba(255, 255, 255, 0.8)" // Light background when selected
                : isFocused
                ? "rgba(255, 255, 255, 0.2)" // Light background when focused
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
                    ? "rgba(255, 255, 255, 0.8)" // Light background on hover for selected
                    : "rgba(255, 255, 255, 0.2)" // Light background on hover
                  : undefined,
              },
            };
          },
          indicatorSeparator: (base) => ({
            ...base,
            backgroundColor: "#4b5563",
          }),
        }}
      />

      {error?.errors?.map((val, index) => (
        <p key={index} className="text-red-500 text-xs m-1">
          {val}
        </p>
      ))}
    </div>
  );
}
