# ONE ISLAM

[oneislam](https://oneislam.pro/) is an IT company founded to connect humanity with Islam and usher in a `new era of halal platforms for Muslims`.

# controller set s3 file upload

[controller set s3 file upload](https://oneislam.pro/) This middleware is designed to reduce redundant code for Node/Express.js developers. It easily handles S3 file uploads, taking a few arguments as functions and returning the file locations. Simply specify the file field names and upload sizes, then use it as middleware.

## Update logs:
* Develop a middleware for `uploading files to S3`.
* Enable `search` functionality.
* Set the default `page size` to 50.
* Add support for custom `middlewares`.
* Enable S3 file uploads via `.env` configuration.

## Features
- Dynamically handles multiple file fields.
- Supports single or multiple file uploads with customizable paths.
- Reduces redundant code by providing reusable middleware for S3 file uploads.

## Documentation

The official documentation website is [controllerSets](https://oneislam.pro/).

controllerSets 1.0.0 was released on May 2023. You can find more details on [backwards breaking changes in 1.0.0 on our docs site](https://oneislam.pro/). 

## Installation
* dependencies
    * [multer]("https://www.npmjs.com/package/multer)
    * [multer-s3]("https://www.npmjs.com/package/multer-s3)
    * [@aws-sdk/client-s3]("https://www.npmjs.com/package/@aws-sdk/client-s3")
    * [controller-sets-s3-file-upload]("https://www.npmjs.com/package/controller-sets-s3-file-upload")

```sh
$ npm i multer multer-s3 @aws-sdk/client-s3  controller-sets-s3-file-upload
```

## Using middleware with [ControllerSets]("https://www.npmjs.com/package/express-controller-sets")

## Config .env file
```env

<!-- S3 secrets -->
S3_ENDPOINT="s3.Aws"
S3_SPACES_KEY="s3.key"
S3_SPACES_SECRET="s3.Secret"
S3_BUCKET_NAME="s3.Name"
S3_REGION="s3.Region" <!-- default = us-east-1 -->

```

```javascript

// Using ES6 imports
import { ControllerSets } from "express-controller-sets";
import { fileUploadMiddleware } from "controller-sets-s3-file-upload";
import taskModel from "./modelPath.js";

// (Mongoose Model, Sorting/ordering field name, filters using req.query)
const taskController = new ControllerSets(taskModel, "-_id", [
    "email",
    "status",
]);

// Upload route
// Uploading single or multiple file field was handled by dynamically. just send a array of objects
"""
For multi field file upload
[
    { name: "img", maxCount: 1, path: "users/profiles/" },
    { name: "license", maxCount: 1, path: "users/license/" },
]

For single field file upload
[
    { name: "img", maxCount: 1 }
]


"""
app.post(
    "/upload",
    (req, res, next) => {
        fileUploadMiddleware(req, res, next, "users/profiles/", [
            { name: "img", maxCount: 1 }
        ]);
    },
    taskController.create.bind(taskController)
)

```

### Using middleware without [ControllerSets]("https://www.npmjs.com/package/express-controller-sets")
```js
// imports
import { fileUploadMiddleware } from "controller-sets-s3-file-upload";

app.post("/upload",
    (req, res, next) => {
        fileUploadMiddleware(req, res, next, [
            { name: "img", maxCount: 1, path: "users/profiles/" },
            { name: "license", maxCount: 1, path: "users/license/" },
        ]);
    },
    (req, res) => {
        console.log(req.body);
        res.send(req.body);
    }
);


```



## License

Copyright (c) 2025 Learn &lt;https://oneislam.pro/&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
