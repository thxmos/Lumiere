import {
  linkRepository,
  LinkResponse,
} from "@/modules/shared/core/db/repositories/link";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/modules/shared/core/auth/lucia";

export const getLinksByGroupId = withAuth(
  async (user: SessionUser, groupId: string): Promise<LinkResponse[]> => {
    const links = await linkRepository.getLinksByGroupId(groupId);
    return links;
  },
);
