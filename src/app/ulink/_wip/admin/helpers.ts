import type { Entity, EntityType, SearchCriteria } from "./types";

const mockData: Entity[] = [
  {
    id: "1",
    name: "johndoe@example.com",
    type: "User",
    email: "johndoe@example.com",
    emailVerified: true,
    image: "https://avatars.githubusercontent.com/u/1234567",
  },
  {
    id: "2",
    name: "My Landing Page",
    type: "Link",
    url: "https://example.com",
    clicks: 150,
    isActive: true,
  },
  {
    id: "3",
    name: "Dark Mode Theme",
    type: "Theme",
    primaryColor: "#1a1a1a",
    secondaryColor: "#ffffff",
    fontFamily: "Inter",
  },
  {
    id: "4",
    name: "Product QR Code",
    type: "QrCode",
    linkId: "link_123",
    imageUrl: "https://storage.example.com/qr/123.png",
    downloadCount: 25,
  },
  {
    id: "5",
    name: "Premium Plan",
    type: "Product",
    price: 9.99,
    currency: "USD",
    isSubscription: true,
  },
];

export function getAttributesForType(type: EntityType): string[] {
  const entity = mockData.find((e) => e.type === type);
  if (!entity) return [];
  return Object.keys(entity).filter((key) => key !== "id" && key !== "type");
}

export async function fetchEntities(
  criteria: SearchCriteria,
): Promise<Entity[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockData.filter((entity) => {
    if (entity.type !== criteria.type) return false;

    const value = entity[criteria.attribute];
    const searchValue = criteria.value.toLowerCase();

    switch (criteria.operator) {
      case "equals":
        return String(value).toLowerCase() === searchValue;
      case "not equals":
        return String(value).toLowerCase() !== searchValue;
      case "less than":
        return typeof value === "number" && value < Number(searchValue);
      case "greater than":
        return typeof value === "number" && value > Number(searchValue);
      case "contains":
        return String(value).toLowerCase().includes(searchValue);
      default:
        return false;
    }
  });
}
