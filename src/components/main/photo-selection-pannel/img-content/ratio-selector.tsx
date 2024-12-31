"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ratioValues = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "9:16",
  "16:9",
] as const;

export type RatioSelectorValue = (typeof ratioValues)[number];

export const getFlulxSize = (type: RatioSelectorValue) => {
  switch (type) {
    case "1:1":
      return { width: 1024, height: 1024 };
    case "2:3":
      return { width: 836, height: 1254 };
    case "3:2":
      return { width: 1254, height: 836 };
    case "3:4":
      return { width: 887, height: 1182 };
    case "4:3":
      return { width: 1182, height: 887 };
    case "9:16":
      return { width: 768, height: 1365 };
    case "16:9":
      return { width: 1365, height: 768 };
  }
};

const RatioSelector = (props: {
  value: RatioSelectorValue;
  onChange: (newValue: RatioSelectorValue) => void;
}) => {
  const { value, onChange } = props;
  return (
    <Select
      value={value}
      onValueChange={(value) => onChange(value as RatioSelectorValue)}
    >
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {ratioValues.map((item, index) => (
          <SelectItem value={item} key={index}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { RatioSelector };
