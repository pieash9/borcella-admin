"use client";

import { FC, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: FC<MultiTextProps> = ({
  value,
  placeholder,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />
      <div className="flex flex-wrap gap-1 mt-4">
        {value.map((item, i) => (
          <Badge key={i} className="bg-grey-1 text-white">
            {item}
            <button
              className="ml-1 rounded-full outline-none hover:bg-red-1 "
              onClick={() => onRemove(item)}
            >
              <X className="size-3.5 m-1" />
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
