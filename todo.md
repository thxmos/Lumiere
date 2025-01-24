## TODOS:

### Roadmap

- get 10 users (the clear, hafta)
- get click data
- get qr code data
- metrics page
- add products tab + merch section on page

### Important

1. ARCHITECTURE for:

   - clicks,
   - image upload,
   - user create,
   - one time sign up flow

2. THEME FORMS CLEAN UP SO IT CAN GO TO PROD

3. Database backups

4. ABAC & Architecture

5. workbench page

6. EASY FIX: fix account settings default country AND/OR add disabled state to country select

7. EASY FIX: dnd new draggable needs draggableId
8. EASY FIX: Toast Helper methods with defaults ie. 2-3 second
9. EASY FIX: refetch props on form saves (ie. preview is out of date if you change username)
10. EASY FIX: fix 3rd part auth redirect to localhost on prod currently (lol oops still wip)
11. EASY FIX: User types and test account so I can put it on my resume too

### Refactors

- Confirm Delete Modal

- make sure all forms have button directly attached, minimize need for e.preventDefault()

- LINK CARDS

  - make into item card compoennt
  - instead of a form for the section just make each one a dynamic component that allows you to update and save individually
  - update indexes on dnd now
  - remove form
  - make dnd component into its own thing and get rid of links-list.tsx
  - rethink the add card, the method right now is ugly, make a modal or something
  - some funky stuff going on with the way the dnd and the state are interacting. creating a new card, saving, then rearranging wont save it quite right

- SOME SORT OF VALIDATION METHOD

  - get session user and return id, throw if not found

- IMAGES

  - image upload component use new imageUploadAction
  - validation in image dialog for file size / dont allow submit / show error message
  - transactions for image upload actions
  - use avatar, link image, etc specific actions to delete image on change (account for upsert)

- REVIEW SESSIONS.ACTIONS

  - strip back lucia and implement from scratch perhaps

- CLICKS

  - add social media clicked to click table

- pagespeed insights
- clean up actions to not require fetching userId in each component
- make Save Changes button consistent
- BACKGROUND TYPE default form value is broken on refresh?
- clean up dto structure and maybe mapper
  - use more Partials and Omits instead of redefining
- make a helper function to get the country name from the country enum

### Nice To Have

- ADMIN features

  - workbench kinda tab
  - wiki / docs
  - user invite

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
