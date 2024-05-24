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
- fix empty image when clicking around gallery images

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
- memoize/contextualize all images(?)
- handle resize in context (instead of gallery)
- reducing backend load using client-side uploads:

  Generate a Signed Token on the Backend: Create an API route to generate and return a signed token or direct upload URL from Cloudinary.

  Use the Token for Client-Side Uploads: Let the client use this token or URL to upload directly to Cloudinary from the browser, which can reduce the load on your Next.js API.

```js
// Client-side script to handle uploading
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "profile");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Upload Error:", error);
  }
}
```