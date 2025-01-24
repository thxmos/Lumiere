"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type {
  EntityType,
  Entity,
  ComparisonOperator,
  SearchCriteria,
} from "./types";
import { fetchEntities, getAttributesForType } from "./helpers";

export function Workbench({
  onEntitySelect,
  isSubmitting,
}: {
  onEntitySelect: (entity: Entity) => void;
  isSubmitting: boolean;
}) {
  const [selectedType, setSelectedType] = useState<EntityType | "">("");
  const [selectedAttribute, setSelectedAttribute] = useState<string>("");
  const [selectedOperator, setSelectedOperator] =
    useState<ComparisonOperator>("none");
  const [searchValue, setSearchValue] = useState("");
  const [attributes, setAttributes] = useState<string[]>([]);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const entityTypes: EntityType[] = [
    "User",
    "Link",
    "Theme",
    "QrCode",
    "Product",
  ];
  const operators: ComparisonOperator[] = [
    "none",
    "equals",
    "not equals",
    "less than",
    "greater than",
    "contains",
  ];

  useEffect(() => {
    if (selectedType) {
      const typeAttributes = getAttributesForType(selectedType);
      setAttributes(typeAttributes);
      setSelectedAttribute(typeAttributes[0] || "");
    } else {
      setAttributes([]);
      setSelectedAttribute("");
    }
  }, [selectedType]);

  const handleSearch = async () => {
    if (!selectedType || !selectedAttribute) return;

    setIsLoading(true);
    try {
      const criteria: SearchCriteria = {
        type: selectedType,
        attribute: selectedAttribute,
        operator: selectedOperator,
        value: searchValue,
      };
      const results = await fetchEntities(criteria);
      setEntities(results);
    } catch (error) {
      console.error("Error fetching entities:", error);
      setEntities([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="workbench-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="entity-type">Entity</Label>
        <Select onValueChange={(value) => setSelectedType(value as EntityType)}>
          <SelectTrigger id="entity-type">
            <SelectValue placeholder="Select entity type" />
          </SelectTrigger>
          <SelectContent>
            {entityTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Attributes</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="attribute">Field</Label>
            <Select
              onValueChange={setSelectedAttribute}
              disabled={!selectedType}
              value={selectedAttribute}
            >
              <SelectTrigger id="attribute">
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                {attributes.map((attr) => (
                  <SelectItem key={attr} value={attr}>
                    {attr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="operator">Operator</Label>
            <Select
              onValueChange={(value) =>
                setSelectedOperator(value as ComparisonOperator)
              }
              value={selectedOperator}
              disabled={selectedAttribute === ""}
            >
              <SelectTrigger id="operator">
                <SelectValue placeholder="Select operator" />
              </SelectTrigger>
              <SelectContent>
                {operators.map((op) => (
                  <SelectItem key={op} value={op}>
                    {op}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="search-value">Value</Label>
            <Input
              id="search-value"
              placeholder="Enter search value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disabled={selectedOperator === "none"}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <Button type="submit" form="workbench-form" disabled={isSubmitting}>
          {isSubmitting ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Results:</h3>
        {entities.length > 0 ? (
          <ul className="space-y-2">
            {entities.map((entity) => (
              <li key={entity.id} className="p-2 bg-gray-100 rounded">
                <Button variant="link" onClick={() => onEntitySelect(entity)}>
                  {entity.name} ({entity.type})
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No entities found.</p>
        )}
      </div>
    </form>
  );
}
