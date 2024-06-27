import multer from 'multer';
import { DIRECTORIES } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIRECTORIES.TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqSuffix = Date.now();
    cb(null, `${uniqSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
