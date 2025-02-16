import { ThemeNoId } from "@/modules/shared/types/entities/theme";

export const ColoredBackground = ({
  localTheme,
}: {
  localTheme: ThemeNoId;
}) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full"
      style={
        localTheme?.gradient
          ? {
              background: `linear-gradient(45deg, ${
                localTheme?.backgroundColor || "#000000"
              }, ${localTheme?.gradientColor || "#000000"})`,
            }
          : { backgroundColor: localTheme?.backgroundColor || "#000000" }
      }
    ></div>
  );
};
