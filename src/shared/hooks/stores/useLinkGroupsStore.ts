import { getLinkGroupsByUserId } from "@/modules/uLink/actions/link/getLinkGroupsByUserId";
import { useLinkGroupsStore } from "@/shared/stores/old/link-group";

export function useLinkGroups() {
  const {
    linkGroups,
    isLoading,
    error,
    setLinkGroups,
    setIsLoading,
    setError,
  } = useLinkGroupsStore();

  const fetchLinkGroups = async (userId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const linkGroups = await getLinkGroupsByUserId();

      // Update the store after successful fetch
      setLinkGroups(linkGroups);

      return linkGroups;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch link groups",
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    linkGroups,
    isLoading,
    error,
    fetchLinkGroups,
  };
}
