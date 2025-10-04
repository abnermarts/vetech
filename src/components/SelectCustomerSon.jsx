import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCustomerSon({ values, label, description, onChange }) {
  return (
    <Select
      onValueChange={(selectedId) => {
        const selected = values.find(
          (item) => String(item.id) === String(selectedId)
        );
        onChange && onChange(selected);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={description} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {values.map((item) => (
            <SelectItem key={item.id} value={String(item.id)}>
              <p className="capitalize">
                {item.Customer?.customerName.toLowerCase()}
              </p>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
