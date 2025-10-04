import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ComboboxDemo({ values, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between capitalize"
        >
          {value
            ? values.find((item) => item.Customer.customerName === value)
                ?.Customer.customerName.toLowerCase()
            : <p className="normal-case">Selecione o produtor</p>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 popover-content-width-full">
        <Command>
          <CommandInput placeholder="Procure o nome do produtor" />
          <CommandList>
            <CommandEmpty>Produtor não localizado.</CommandEmpty>
            <CommandGroup>
              {values.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.Customer.customerName}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    const selected = values.find(
                      (item) => item.Customer.customerName === currentValue
                    );
                    onChange && onChange(selected);
                    setOpen(false);
                  }}
                  className="capitalize"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.Customer.customerName
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.Customer.customerName.toLowerCase()}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
