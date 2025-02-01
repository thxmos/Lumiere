import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { ThemeEditorSection } from "./theme-editor.section";
import { validateAuthPage } from "@/utils/security/auth";
import { getImagesByUserId } from "@/actions/entities/asset/getAssetsByUserId";

const ThemeEditorPage = async () => {
  const user = await validateAuthPage();
  const theme = await getThemeAction(user.id);
  const assets = await getImagesByUserId();

  return (
    <>
      <ThemeEditorSection initialTheme={theme} assets={assets} />
    </>
  );
};

export default ThemeEditorPage;
