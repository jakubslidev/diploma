"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path_1 = require("path");
exports.multerOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, callback) => {
            const randomName = (0, uuid_1.v4)();
            callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        },
    }),
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
    },
};
//# sourceMappingURL=multer.config.js.map