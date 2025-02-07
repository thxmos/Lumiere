# Sidebar Nav

## get-nav-info.tsx

Server-side function that fetches and returns navigation data for authenticated users. Uses the withAuth wrapper to ensure authentication.

Returns structured navigation data including:

- User profile information
- Account data
- Module navigation links
- Main navigation structure with nested items

## Account Switcher

A dropdown component for switching between different team accounts in the sidebar.

The `Team` type defines the shape of each team entry

## Breadcrumbs

A dynamic breadcrumb navigation component that generates path hierarchy from the current URL.

Design Decisions

- Automatically generates formatted breadcrumbs from URL path
- Filters out "dashboard" from breadcrumbs
- Transforms URL segments into readable labels (e.g., "user-settings" → "User Settings")

The return type from `generateBreadcrumb` defines the format of processed URL segments

## Nav Account

Navigation component for account-specific items with dropdown actions for each item.

Highlights active navigation items based on current path
Includes dropdown actions: View Project, Share Project, Delete Project

Project defines navigation item structure
NavAccountProps specifies expected props format

## Nav Main

Primary navigation component handling collapsible module sections.
Implementation Details

Automatically opens active section
Supports nested navigation items

The `NavItem` type provides complete structure for navigation entries including nested items

## Nav User

User profile component with dropdown menu for account settings.

Displays user avatar with fallback to initials
Shows premium upgrade option
