"use client";

import { useState } from "react";
import { LinksTab } from "./links.tab";
import type { LinkDtoWithId } from "@/types/links";
import type { ThemeNoId } from "@/types/theme";
import { ShowDatesTab } from "./show-dates.tab";

export function TabSelector({
  links,
  theme,
  isPreview,
}: {
  links: LinkDtoWithId[];
  theme: ThemeNoId;
  isPreview: boolean;
}) {
  const [activeTab, setActiveTab] = useState("links");

  const tabStyle = (isActive: boolean) => ({
    backgroundColor: isActive
      ? theme.cardBackgroundColor
      : theme.backgroundColor,
    color: isActive ? theme.fontColor : theme.secondaryColorFont,
    borderColor: theme.borderColor,
    borderWidth: `${theme.borderWidth}px`,
    borderStyle: theme.borderStyle,
    borderRadius: `${theme.borderRadius}px`,
    fontWeight: theme.fontWeight,
    fontFamily: theme.fontFamily,
  });

  return (
    <div>
      <div className="flex mb-4">
        {/* <button
          className="flex-1 py-2 px-4 text-center transition-all duration-200 ease-in-out"
          style={tabStyle(activeTab === "links")}
          onClick={() => setActiveTab("links")}
        >
          Links
        </button> */}
        {/* Uncomment and adjust thgiese buttons when ready to implement
        <button
          className="flex-1 py-2 px-4 text-center transition-all duration-200 ease-in-out"
          style={tabStyle(activeTab === "showDates")}
          onClick={() => setActiveTab("showDates")}
        >
          Show Dates
        </button>
        <button
          className="flex-1 py-2 px-4 text-center transition-all duration-200 ease-in-out"
          style={tabStyle(activeTab === "merch")}
          onClick={() => setActiveTab("merch")}
        >
          Merch
        </button>
        */}
      </div>
      {activeTab === "links" && (
        <LinksTab links={links} theme={theme} isPreview={isPreview} />
      )}
      {/* {activeTab === "show-dates" && <ShowDatesTab theme={theme as ThemeNoId} />} */}
      {/* Uncomment these when ready to implement
      {activeTab === "merch" && <MerchTab theme={theme} />}
      */}
    </div>
  );
}
