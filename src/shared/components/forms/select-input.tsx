import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

interface SelectInputProps {
  options: { label: string; value: string }[];
  placeholder: string;
  defaultValue?: string;
  onValueChange: (value: string) => void;
  isFontsSelect?: boolean;
}

export function SelectInput({
  options,
  placeholder,
  defaultValue,
  onValueChange,
  isFontsSelect = false,
}: SelectInputProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue
          placeholder={placeholder}
          style={
            isFontsSelect && defaultValue
              ? { fontFamily: defaultValue }
              : undefined
          }
        />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            style={isFontsSelect ? { fontFamily: option.value } : undefined}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
