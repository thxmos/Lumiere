import { withAuth } from "@/utils/security/auth";
import { del } from "@vercel/blob";
import { SessionUser } from "@/utils/lib/lucia";

export const deleteBlob = withAuth(async (user: SessionUser, path: string) => {
  await del(`${path}${user.id}`);
});
