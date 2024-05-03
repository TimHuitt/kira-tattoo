## Main Features
- add contact notification on success/failure
- add images to posts

## Admin
- add authorization
- add 'add/edit' buttons for each section
  - create popup for for adding post/image
- add delete buttons to each post/image
- add delete buttons to scrollable modal
- add change order option to images (?)

## Backend
- create routes
- add cloudinary upload/delete


## Routes

### Header Info
  - user photo
  - intro header
  - intro statement
  - featured images

## Updates
  - post
    - header
    - description
    - content
    - images
    - date

## Portfolio
  - header text
  - images

## Booking
  - link

```sql
  CREATE TABLE Header (
    header VARCHAR(255),
    statement VARCHAR(255),
    photo VARCHAR(255),
    images VARCHAR(255)
  );
  CREATE TABLE Updates (
    header VARCHAR(255),
    description VARCHAR(255),
    content VARCHAR(255),
    images VARCHAR(255),
    date DATE
  );
  CREATE TABLE Portfolio (
    header VARCHAR(255),
    images VARCHAR(255)
  );
  CREATE TABLE Booking (
    link VARCHAR(255)
  );
```