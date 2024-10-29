import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";

dotenv.config();

const s3Client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: true,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.S3_SPACES_KEY,
        secretAccessKey: process.env.S3_SPACES_SECRET,
    },
});

(async () => {
    try {
        const response = await s3Client.send(new ListBucketsCommand({}));
        console.log("Available Buckets:", response.Buckets);
    } catch (error) {
        console.error("Error listing buckets:", error);
    }
})();

const BUCKET_NAME = process.env.S3_BUCKET_NAME;

const fileUploadMiddleware = (
    req,
    res,
    next,
    path,
    fields = [{ name: "file", maxCount: 1 }]
) => {
    const upload = multer({
        storage: multerS3({
            s3: s3Client,
            bucket: BUCKET_NAME,
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                const uniqueFileName = `${Date.now()}-${file.originalname}`;
                const filePath = `${path}${uniqueFileName}`;
                cb(null, filePath);
            },
        }),
    });

    if (fields.length === 1) {
        // Single file upload
        upload.single(fields[0].name)(req, res, (error) => {
            if (error) {
                console.error("Error uploading file:", error);
                return res.status(500).json({ error: "Failed to upload file" });
            }

            req.body[fields[0].name] = req.file.location; // Store the uploaded file URL in req.body
            console.log("inside middleware -->", req.body);

            next(); // Call next middleware or route handler
        });
    } else {
        // Multiple file upload
        upload.fields(fields)(req, res, (error) => {
            if (error) {
                console.error("Error uploading files:", error);
                return res
                    .status(500)
                    .json({ error: "Failed to upload files" });
            }

            fields.forEach((field) => {
                if (req.files[field.name]) {
                    req.files[field.name].forEach((file) => {
                        req.body[`${field.name}`] = file.location;
                    });
                }
            });
            next();
        });
    }
};

export { fileUploadMiddleware };
