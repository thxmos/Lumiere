## TODOS:

### Important

- don't allow for duplicate usernames
- Limiting File Uploads: Restrict the size of file uploads using Content-Length headers or custom logic in API routes.
- up to 10 links per user
- up to 3 (or 10?) qr codes per user
- fix 3rd part auth redirect to localhost
- check mobile design
- fix bg image/video toggle
- social icons
- default font family

### Nice To Have

- FEATURE FLAGS for admin OR 2 user types
- sqids (what for again i forget)
- default themes
- theme editor page that shows the current theme applied to your profile
  - seperate username page into seperate component
- track clicks on links
- fix resend smh
- delete files from blob storage when deleting a link or unsetting avatar upload
- delete files from blob storage when deleting a link or unsetting avatar upload
- soft delete links and be able to restore them / view stats
- helper method to ensure https:// is prepended to the url
- Paginating API Results: Ensure APIs return only limited data at a time with pagination.s
- logging
- circleci

### Backlog from previous

- validate dtos in data access layer
- cron job for cleaning up expired sessions
- database transaction support
- UI Main layout component (prevent page scrolling when unecessary)
- AUTH Location Verification
  - verify different devices / location from the first signed up device
  - 2fa enablement
- Billing Page Invoice history
- DOCUMENTATION
  - where to get env variables
  - commands
  - stripe setup
- Stripe Webhook Helper Functions
  - move all stripe webhooks into helper function files? products.helpers.ts, prices.helpers.ts or something more modular
