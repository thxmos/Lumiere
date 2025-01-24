import { getTheme } from "@/actions/theme.actions";
import { getUser } from "@/actions/session.actions";
import { ThemeEditorSection } from "./theme-editor.section";

const ThemeEditorPage = async () => {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id!;
  const theme = await getTheme(userId);

  return (
    <>
      <ThemeEditorSection userId={userId} initialTheme={theme} />
    </>
  );
};

export default ThemeEditorPage;
