import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // make sure this folder exists
    filename: (req, file, callback) => {
      const randomName = uuidv4(); // Generate a unique name
      // Apply the random name with the original extension
      callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // You can throw an error or pass null to reject the file
      callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  // You can add limits here, e.g. fileSize: 1MB
  // limits: { fileSize: 1024 * 1024 },
};
