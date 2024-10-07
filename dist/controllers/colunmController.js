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
exports.getColumnById = exports.getAllColumnsByBoardId = exports.getAllColumns = exports.createColumn = void 0;
const Column_1 = require("../models/Column");
const Board_1 = __importDefault(require("../models/Board"));
const http_errors_1 = __importDefault(require("http-errors"));
const createColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: boardID } = req.params;
    const { name } = req.body;
    const existingBoard = yield Board_1.default.findOne({ _id: boardID });
    if (!existingBoard)
        throw (0, http_errors_1.default)(404, "You trying to add column to unexisting board");
    const existingColumns = yield Column_1.Column.find({ boardID });
    const columnNames = existingColumns.map(column => column.name);
    if (columnNames.length >= 3)
        throw (0, http_errors_1.default)(400, "You can't add more than 3 columns");
    if (columnNames.includes(name))
        throw (0, http_errors_1.default)(400, "Column with this name already exists");
    const newColumn = yield Column_1.Column.create({ name, boardID });
    existingBoard.columns.push(newColumn.id);
    yield existingBoard.save();
    res.status(201).json(newColumn);
});
exports.createColumn = createColumn;
const getAllColumns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const columns = yield Column_1.Column.find();
    res.json(columns);
});
exports.getAllColumns = getAllColumns;
const getAllColumnsByBoardId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardID } = req.params;
    const columns = yield Column_1.Column.find({ _id: boardID });
    if (!columns)
        throw (0, http_errors_1.default)(404, "Columns not found");
    res.json(columns);
});
exports.getAllColumnsByBoardId = getAllColumnsByBoardId;
const getColumnById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardID, columnID } = req.params;
    const board = yield Board_1.default.findOne({ _id: boardID });
    if (!board)
        throw (0, http_errors_1.default)(404, "Board not found");
    const column = yield Column_1.Column.findOne({ _id: columnID, boardID });
    if (!column)
        throw (0, http_errors_1.default)(404, "Column not found");
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    console.log("Request Query:", req.query);
    res.json(column);
});
exports.getColumnById = getColumnById;
