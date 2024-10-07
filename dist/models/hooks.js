"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preUpdate = exports.handleSaveError = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleSaveError = (error, _, next) => {
    if (error instanceof Error && 'name' in error && 'code' in error) {
        const { name, code } = error;
        error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
    }
    next();
};
exports.handleSaveError = handleSaveError;
const preUpdate = function (next) {
    if (this instanceof mongoose_1.default.Model) {
        this.options.new = true;
        this.options.runValidators = true;
    }
    next();
};
exports.preUpdate = preUpdate;
