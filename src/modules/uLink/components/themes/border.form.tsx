import { Controller } from "react-hook-form";
import { ThemeFormProps } from "./font.form";
import { ColorSelect } from "@components/forms/color-select/color-select";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import { SelectInput } from "@components/forms/select-input";
import { Separator } from "@components/ui/separator";

export function BorderSection({ control, themePrimaryColor }: ThemeFormProps) {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-bold">Border</Label>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Border Color</Label>
        <Controller
          name="theme.borderColor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ColorSelect
              value={value}
              themePrimaryColor={themePrimaryColor}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Border Radius</Label>
        <Controller
          name="theme.borderRadius"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              value={value}
              onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
              max={40}
              min={0}
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Border Width</Label>
        <Controller
          name="theme.borderWidth"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              value={value}
              onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
              max={5}
              min={0}
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Border Style</Label>
        <Controller
          name="theme.borderStyle"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              options={[
                { label: "Solid", value: "solid" },
                { label: "Dashed", value: "dashed" },
                { label: "Dotted", value: "dotted" },
              ]}
              placeholder="Select border style"
              onValueChange={onChange}
              defaultValue={value}
            />
          )}
        />
      </div>
      <Separator />
    </div>
  );
}
