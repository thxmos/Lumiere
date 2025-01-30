import { getThemeAction } from "@/actions/entities/theme/getTheme";
import { ThemeEditorSection } from "./theme-editor.section";
import { validateAuthPage } from "@/utils/security/auth";

const ThemeEditorPage = async () => {
  const user = await validateAuthPage();
  const theme = await getThemeAction(user.id);

  return (
    <>
      <ThemeEditorSection initialTheme={theme} />
    </>
  );
};

export default ThemeEditorPage;
