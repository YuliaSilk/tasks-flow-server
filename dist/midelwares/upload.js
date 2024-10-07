"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../helpers");
const destination = path_1.default.resolve("temp");
const storage = multer_1.default.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniquePrefix}${path_1.default.extname(file.originalname)}`;
        cb(null, filename); // Ensure that filename is always a string
    },
});
const limits = {
    fileSize: 5 * 1024 * 1024,
};
const fileFilter = (req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
        return cb(new helpers_1.HttpError(400, "Invalid file extension"), false);
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    limits,
    fileFilter,
});
exports.default = upload;
