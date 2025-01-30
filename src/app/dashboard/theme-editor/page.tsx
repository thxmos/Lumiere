import { getThemeAction } from "@/actions/entities/theme/theme";
import { ThemeEditorSection } from "./theme-editor.section";
import { validateAuthPage } from "@/utils/security/auth";

const ThemeEditorPage = async () => {
  const user = await validateAuthPage();
  const theme = await getThemeAction(user.id);

  return (
    <>
      <ThemeEditorSection userId={user.id} initialTheme={theme} />
    </>
  );
};

export default ThemeEditorPage;
