"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.getBoardById = exports.getAllBoards = exports.createBoard = void 0;
const Board_1 = __importDefault(require("../models/Board"));
const Column_1 = require("../models/Column");
const ColumnNames_1 = require("../models/ColumnNames");
const helpers_1 = require("../helpers");
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const existingBoard = yield Board_1.default.findOne({ title });
    if (existingBoard) {
        res.status(400).json({ message: 'Board with this name already exists' });
        return;
    }
    const newBoard = yield Board_1.default.create({
        title
    });
    const todoColumn = yield Column_1.Column.create({ name: ColumnNames_1.ColumnNames.TODO, boardID: newBoard._id });
    const inProgressColumn = yield Column_1.Column.create({ name: ColumnNames_1.ColumnNames.IN_PROGRESS, boardID: newBoard._id });
    const doneColumn = yield Column_1.Column.create({ name: ColumnNames_1.ColumnNames.DONE, boardID: newBoard._id });
    newBoard.columns.push(todoColumn.id, inProgressColumn.id, doneColumn.id);
    yield newBoard.save();
    res.status(201).json(newBoard);
});
exports.createBoard = createBoard;
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resalt = yield Board_1.default.find().populate({ path: "columns", select: "name",
        populate: { path: "card", select: "title description", },
    });
    res.json(resalt);
});
exports.getAllBoards = getAllBoards;
const getBoardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resalt = yield Board_1.default.findById(req.params.id).populate({ path: "columns", select: "name",
        populate: { path: "card", select: "title description", },
    });
    if (!resalt)
        throw new helpers_1.HttpError(404, "Board not found");
    res.json(resalt);
});
exports.getBoardById = getBoardById;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Board_1.default.findByIdAndDelete(id);
    if (!result)
        throw new helpers_1.HttpError(404, "Board not found");
    res.json({ message: "Board deleted successfully" });
});
exports.deleteBoard = deleteBoard;
