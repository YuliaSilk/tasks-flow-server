"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.taskChangeColumnSchema = exports.cardEditSchema = exports.cardAddSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const hooks_1 = require("./hooks");
const CardSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    columnID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    boardID: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Card",
    }
}, { versionKey: false, timestamps: true });
// CardSchema.methods.handleSaveError = handleSaveError;
// CardSchema.methods.preUpdate = preUpdate;
// CardSchema.methods.handleSaveError = function(this: ICard, error: any){
//   handleSaveError
// }
// CardSchema.methods.preUpdate = function(this: ICard, next: any){
//   preUpdate
// }
CardSchema.methods.handleSaveError = function (error) {
    (0, hooks_1.handleSaveError)(error, this, () => { });
};
CardSchema.methods.preUpdate = function (next) {
    (0, hooks_1.preUpdate)(next);
};
exports.cardAddSchema = joi_1.default.object({
    title: joi_1.default.string().max(32).required(),
    description: joi_1.default.string().max(10000).allow(''),
});
exports.cardEditSchema = joi_1.default.object({
    title: joi_1.default.string().max(32).allow('').optional(),
    description: joi_1.default.string().max(10000).allow('').optional(),
    columnID: joi_1.default.string().optional(),
});
exports.taskChangeColumnSchema = joi_1.default.object({
    columnID: joi_1.default.string().required(),
});
exports.Card = mongoose_1.default.model('Card', CardSchema);
