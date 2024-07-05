import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../images');
    
    // Check if the directory exists, and create it if it doesn't
    fs.mkdir(uploadPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, uploadPath);
      }
      cb(null, uploadPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: fileFilter
});

// Middleware to create a thumbnail
export const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const thumbnailDir = path.join(__dirname, '../../images/thumbnails');

  // Ensure the thumbnails directory exists
  fs.mkdir(thumbnailDir, { recursive: true }, async (err) => {
    if (err) {
      return next(err);
    }

    const thumbnailPath = path.join(thumbnailDir, req.file.filename);

    try {
      await sharp(req.file.path)
        .resize(35, 35) // Resize to 200x200 pixels
        .toFile(thumbnailPath);

      // Optionally, you can add the thumbnail path to the request object
      req.file.thumbnailPath = thumbnailPath;

      next();
    } catch (err) {
      next(err);
    }
  });
};
