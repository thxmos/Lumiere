import { Controller } from "react-hook-form";
import { ThemeFormProps } from "./font.form";
import { Label } from "@/shared/components/ui/label";
import { ColorSelect } from "@/shared/components/forms/color-select/color-select";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";

export function CardSection({ control, themePrimaryColor }: ThemeFormProps) {
  return (
    <div className="space-y-4">
      <Label className="text-lg font-bold">Card</Label>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Background Color</Label>
        <Controller
          name="theme.cardBackgroundColor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ColorSelect
              value={value || ""}
              themePrimaryColor={themePrimaryColor}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Card Text Color</Label>
        <Controller
          name="theme.cardTextColor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ColorSelect
              value={value || ""}
              themePrimaryColor={themePrimaryColor}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Shadow Size</Label>
        <Controller
          name="theme.cardShadowSize"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
              max={3}
              min={0}
              placeholder="0-10px"
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">
          Shadow <br /> Color
        </Label>
        <Controller
          name="theme.cardShadowColor"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ColorSelect
              value={value || ""}
              themePrimaryColor={themePrimaryColor}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Shadow Offset</Label>
        <Controller
          name="theme.cardShadowOffset"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
              max={50}
              min={0}
              placeholder="0-50px"
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Shadow Direction</Label>
        <Controller
          name="theme.cardShadowDirection"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => {
                const val = Number.parseInt(e.target.value, 10);
                onChange(((val % 360) + 360) % 360);
              }}
              max={360}
              min={0}
              placeholder="0-360°"
            />
          )}
        />
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <Label className="w-24 font-bold">Shadow Blur</Label>
        <Controller
          name="theme.cardShadowBlur"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              type="number"
              value={value || 0}
              onChange={(e) => onChange(Number.parseInt(e.target.value, 10))}
              max={15}
              min={0}
              placeholder="0-100px"
            />
          )}
        />
      </div>
      <Separator />
    </div>
  );
}
