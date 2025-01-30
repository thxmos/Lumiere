import { ClickRepository } from "@/repositories/click/click.repository";

export async function getNumOfClicksByLinkId(linkId: string) {
  const clickRepository = new ClickRepository();
  const clicks = await clickRepository.getAllByLinkId(linkId);
  return clicks.length;
}
