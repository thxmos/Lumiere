"use client";

import { useState } from "react";
import { LinksTab } from "./links-tab";
import { LinkDto } from "@/data-access/links";
import { ThemeNoId } from "@/data-access/theme";

export function TabSelector({
  links,
  theme,
}: {
  links: LinkDto[];
  theme: ThemeNoId;
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
        {/* Uncomment and adjust these buttons when ready to implement
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
      {activeTab === "links" && <LinksTab links={links} theme={theme} />}
      {/* Uncomment these when ready to implement
      {activeTab === "showDates" && <ShowDates theme={theme} />}
      {activeTab === "merch" && <MerchTab theme={theme} />}
      */}
    </div>
  );
}
