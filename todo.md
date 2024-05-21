## Main Features
- add contact notification on success/failure
- add image saving to db and fetching to posts
- add gallery loading indicator
- move all db data (including existing header data) to context
- clicking links should close any open windows (images/portfolio view)
- fix double loading indicator in featured images
- scroll to top of updates when minimizing posts
- center portfolio featured images
- add image fetching to section

## Admin
- add 'add/edit' buttons for each section
  - create popup for for adding post/image
- add delete buttons to each post/image
- add delete buttons to scrollable modal
- add change order option to images (?)

## Backend
- create routes
- add cloudinary upload/delete
- add JWT authentication for all CMS actions

## Performance
- handle resize in context (instead of gallery)