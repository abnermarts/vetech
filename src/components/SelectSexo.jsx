import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectSexo({ value, onChange, label = "Sexo", description = "Selecione o sexo" }) {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={description} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          <SelectItem value="1">Macho</SelectItem>
          <SelectItem value="2">Fêmea</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}