import { Controller } from "react-hook-form";

import { Theme } from "@prisma/client";
import { Control } from "react-hook-form";
import { FONTS } from "@/config/theme/fonts";
import { SelectInput } from "@/modules/shared/components/forms/select-input";
import { Label } from "@/modules/shared/components/ui/label";
import { Separator } from "@/modules/shared/components/ui/separator";
import { ColorSelect } from "@/modules/shared/components/forms/color-select/color-select";

export interface ThemeFormProps {
  control: Control<{
    theme: Theme;
  }>;
  themePrimaryColor: string;
}

// FontSection.tsx
export function FontSection({ control, themePrimaryColor }: ThemeFormProps) {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-bold">Font</Label>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Font Family</Label>
        <Controller
          name="theme.fontFamily"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              options={FONTS}
              placeholder="Select font family"
              onValueChange={onChange}
              defaultValue={value || FONTS[0].value}
              isFontsSelect
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Text Color</Label>
        <Controller
          name="theme.fontColor"
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
        <Label className="w-24 font-bold">Secondary Text Color</Label>
        <Controller
          name="theme.secondaryColorFont"
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
      <Separator />
    </div>
  );
}
