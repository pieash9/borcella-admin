"use client";

import { FC, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTagProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: FC<MultiTagProps> = ({
  value,
  placeholder,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (item: string) => {
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
            addTag(inputValue);
          }
        }}
      />
      <div className="flex flex-wrap gap-1 mt-4">
        {value.map((tag, i) => (
          <Badge key={i} className="bg-grey-1 text-white">
            {tag}
            <Button
              className="ml-2 rounded-full outline-none hover:bg-red-1 "
              onClick={() => onRemove(tag)}
              size={"sm"}
            >
              <X className="size-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
