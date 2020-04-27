import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

const dirName = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  dirName,
  storage: multer.diskStorage({
    destination: dirName,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
