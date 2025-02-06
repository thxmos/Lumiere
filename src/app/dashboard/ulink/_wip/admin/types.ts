export type EntityType = "User" | "Link" | "Theme" | "QrCode" | "Product";

export type ComparisonOperator =
  | "none"
  | "equals"
  | "not equals"
  | "less than"
  | "greater than"
  | "contains";

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  [key: string]: any; // Allow for additional properties
}

export interface SearchCriteria {
  type: EntityType;
  attribute: string;
  operator: ComparisonOperator;
  value: string;
}

export interface WorkbenchProps {
  onEntitySelect: (entity: Entity) => void;
}
