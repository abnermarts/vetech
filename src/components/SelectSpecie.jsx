import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectSpecie({ values, label, description, onChange }) {
  return (
    <Select
      onValueChange={(selectedId) => {
        const selected = values.find(
          (item) => String(item.id) === String(selectedId)
        );
        onChange(selected);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={description} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((select) => {
            return (
              <SelectItem key={select.id} value={String(select.id)}>
                <p className="capitalize"> {select.specieName.toLowerCase()}</p>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
