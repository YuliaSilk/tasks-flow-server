"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnAddSchema = exports.Column = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const hooks_1 = require("./hooks");
const ColumnSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Set name for column"],
    },
    card: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Card",
        },
    ],
    boardID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    },
}, { versionKey: false, timestamps: true });
ColumnSchema.methods.handleSaveError = hooks_1.handleSaveError;
ColumnSchema.methods.preUpdate = hooks_1.preUpdate;
exports.Column = (0, mongoose_1.model)("Column", ColumnSchema);
exports.columnAddSchema = joi_1.default.object({
    name: joi_1.default.string().max(32).required(),
});
