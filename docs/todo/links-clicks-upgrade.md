# Links Clicks Upgrade

## Data & Schema Enhancements

1. Save more click data
   - helper method to get the browser info and save to db
2. Edit schema to allow for QR codes, and social media clicks
   - track QR code scans?
   - add social media clicked to click table
   - it can be either social media or link
3. Add mobile styling to make it a push button animation
4. track target link clicked in case that user changes the link after

## Component: Link Cards

- make into item card compoennt
- instead of a form for the section just make each one a dynamic component that allows you to update and save individually
- update indexes on dnd now
- remove form
- make dnd component into its own thing and get rid of links-list.tsx
  - rethink the add card, the method right now is ugly, make a modal or something
  - some funky stuff going on with the way the dnd and the state are interacting. creating a new card, saving, then rearranging wont save it quite right
