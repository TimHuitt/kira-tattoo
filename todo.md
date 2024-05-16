## Main Features
- add contact notification on success/failure
- add image saving to db and fetching to posts
- add gallery loading indicator
- move all db data (including existing header data) to context
- clicking links should close any open windows (images/portfolio view)

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

## Performance
- check 'console.log(imageName)' exponentially rendering
- ** images?.map in Gallery is rerendering exponentially
- handle resize in context (instead of gallery)
- use memoization for image processing
  ```js
  const processedImages = useMemo(() => images.map(image => {
    const currentImg = cld.image(image);
    currentImg.resize(fill().width(250).height(250));
    return currentImg;
  }), [images]);
  ```


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