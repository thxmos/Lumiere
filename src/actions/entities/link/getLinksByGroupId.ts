import { linkRepository, LinkResponse } from "@/repositories/link";
import { withAuth } from "@/utils/security/auth";
import { SessionUser } from "@/utils/lib/lucia";

export const getLinksByGroupId = withAuth(
  async (user: SessionUser, groupId: string): Promise<LinkResponse[]> => {
    const links = await linkRepository.getLinksByGroupId(groupId);
    return links;
  },
);
