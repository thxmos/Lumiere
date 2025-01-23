## TODOS:

### Roadmap

- get 10 users (the clear, hafta)
- get click data
- get qr code data
- metrics page
- add products tab + merch section on page

### Important

1. Better image upload system

   - [ ] make entity assigned to userId
   - [ ] products, links, etc can reference the entity
   - [ ] make a helper function to upload images to blob storage
   - [ ] make a helper function to delete images from blob storage
   - [ ] make a helper function to get images from blob storage
   - [ ] Variable file size restriction for uploadBlob method

2. LIMIT up to 10 links per user (no archive/soft delete for now)
3. LIMIT up to 3 (or 10?) qr codes per user
4. fix 3rd part auth redirect to localhost on prod currently (lol oops still wip)
5. User types and test account so I can put it on my resume too
6. database backups

### Refactors

- clean up actions to not require fetching userId in each component
- make Save Changes button consistent
- BACKGROUND TYPE default form value is broken on refresh?
- theme dynamic forms clean up
- clean up dto structure and maybe mapper
- actions vs data access layer?
- where is select input being used?
- make a helper function to get the country name from the country enum
- validateSession method to use in protected routes and actions
- color scheme utils for theme editor

### Nice To Have

- split themes into seperate files or something cleaner? and make 8 more
- don't allow for duplicate usernames (still going to keep it closed circle for now)
- FEATURE FLAGS for admin OR user types for subscriptions too

- default themes for username page

- track clicks on links
- fix resend smh
- delete files from blob storage when deleting a link or unsetting avatar upload
- delete files from blob storage when deleting a link or unsetting avatar upload
- cascading soft delete on user that saves all daata in a file
- soft delete (archive)links and be able to restore them / view stats / use for metrics
- helper method to ensure https:// is prepended to the url
- better logging
- CircleCI

- DRYER Blob Image Upload implementation
  - used in product edit tab and avatar upload, make into a more reusable action
- sqids
  - not needed until products is ready
- better logging

  - not needed until app is prod ready

  - theme editor page that shows the current theme applied to your profile
  - seperate username page into seperate component

- Paginating API Results
  - Ensure APIs return only limited data at a time with pagination
  - not needed if enforcing the limits but could be good if theres ever a pro plan

### Backlog from previous

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
