# TODOS:

## Roadmap

- get 10 users (the clear, hafta)
- get qr code data
- metrics page
- add products tab + merch section on page

## Important For Launch

- image & video background upload
- warn user if unsaved changes
- disable image upload on link card if not in edit mode

1. DESIGN for:

   - clicks,
   - image upload,
   - user create,
   - one time sign up flow

2. Database backups

3. EASY FIX: add default country in profile page

4. EASY FIX BUG: dnd new draggable needs draggableId

5. EASY FIX: refresh props on form saves OR optimistically update (ie. preview is out of date if you change username)

6. EASY FIX: fix 3rd part auth redirect to localhost on prod currently (lol oops still wip)

7. navigate to not found page on username is theres no user found & redirect on product page for now too

## Future Features

### Item Card

- simple component to re-use for link, qr code, product, etc
- mainly UI focused, logic can be implemented in individual components
- take in different sizes ie sm md lg
- take in different styles ie. primary, secondary, tertiary

### Workbench page

- dynamically get entities
- display in a table
- table pagination

### Refactors

- Toast Helper methods with defaults ie. 2-3 second

- make sure all forms have button directly attached, minimize need for e.preventDefault()

- SOME SORT OF VALIDATION METHOD

  - get session user and return id, throw if not found

- REVIEW SESSIONS.ACTIONS

  - strip back lucia and implement from scratch perhaps

- pagespeed insights
- clean up actions to not require fetching userId in each component
- make Save Changes button consistent
- BACKGROUND TYPE default form value is broken on refresh?
- clean up dto structure and maybe mapper
  - use more Partials and Omits instead of redefining
- make a helper function to get the country name from the country enum

- don't allow for duplicate usernames (still going to keep it closed circle for now)

### Nice To Have

- Generic Card Item Component

- ADMIN features

  - workbench kinda tab
  - wiki / docs
  - user invite

- split themes into seperate files or something cleaner? and make 8 more
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
