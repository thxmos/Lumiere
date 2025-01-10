## TODOS:

- don't allow for duplicate usernames
- Limiting File Uploads: Restrict the size of file uploads using Content-Length headers or custom logic in API routes.
- Paginating API Results: Ensure APIs return only limited data at a time with pagination.s
- fix resend smh

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
