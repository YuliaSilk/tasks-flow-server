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
exports.dndMovement = exports.deleteCard = exports.updateCard = exports.getCardById = exports.getCards = exports.createCard = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Card_1 = require("../models/Card");
const Column_1 = require("../models/Column");
const helpers_1 = require("../helpers");
const CardSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
});
const ColumnSchema = new mongoose_1.default.Schema({
    name: String,
    cards: [CardSchema],
});
const BoardSchema = new mongoose_1.default.Schema({
    title: String,
    columns: [ColumnSchema],
});
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { boardId, columnId } = req.params;
    const { title, description } = req.body;
    const newColumn = yield Column_1.Column.findOne({ _id: columnId, boardID: boardId });
    if (!newColumn)
        throw new helpers_1.HttpError(404, "Column not found");
    const newCard = yield Card_1.Card.create({ title, description, columnID: columnId, boardID: boardId });
    newColumn.card.push(newCard.id);
    yield newColumn.save();
    res.status(201).json(newCard);
});
exports.createCard = createCard;
const getCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Card_1.Card.find();
    res.json(result);
});
exports.getCards = getCards;
const getCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Card_1.Card.findById(req.params.id);
    if (!result)
        throw new helpers_1.HttpError(404, "Card not found");
    res.json(result);
});
exports.getCardById = getCardById;
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = yield Card_1.Card.findByIdAndUpdate(id, { title, description }, { new: true, upsert: false });
    res.json(result);
});
exports.updateCard = updateCard;
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, columnId } = req.params;
    const result = yield Card_1.Card.findByIdAndDelete(id);
    if (!result)
        throw new helpers_1.HttpError(404, "Card not found");
    yield Column_1.Column.findByIdAndUpdate(columnId, { $pull: { card: id } });
    res.json({ message: 'Card deleted successfully' });
});
exports.deleteCard = deleteCard;
const dndMovement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, boardId } = req.params;
    const { finishCardIndex, finishColumnID } = req.body;
    console.log(`Moving card ${id} to column ${finishColumnID} at index ${finishCardIndex}`);
    const card = yield Card_1.Card.findById(id);
    if (!card)
        throw new helpers_1.HttpError(404, "You are trying to move a non-existing card");
    const startColumnID = card.columnID;
    yield Column_1.Column.findByIdAndUpdate(startColumnID, { $pull: { cards: card._id } });
    const finishColumn = yield Column_1.Column.findById(finishColumnID).populate('cards');
    if (!finishColumn) {
        console.log(`Finish column not found: ${finishColumnID}`);
        throw new helpers_1.HttpError(404, "Finish column not found");
    }
    finishColumn.cards = finishColumn.cards.filter(c => c.toString() !== card._id.toString());
    finishColumn.cards.splice(finishCardIndex, 0, card._id);
    yield finishColumn.save();
    card.columnID = finishColumnID;
    yield card.save();
    res.json({ card, finishCardIndex, startColumnID, finishColumnID });
});
exports.dndMovement = dndMovement;
