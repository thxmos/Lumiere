import { ThemeNoId } from "@/shared/types/entities/theme";

export const ImageBackground = ({ localTheme }: { localTheme: ThemeNoId }) => {
  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${localTheme?.backgroundImageUrl})` }}
    ></div>
  );
};
