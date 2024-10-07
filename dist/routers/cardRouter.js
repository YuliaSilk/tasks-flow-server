"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardsControllers_1 = require("../controllers/cardsControllers");
const isValidateId_1 = __importDefault(require("../midelwares/isValidateId"));
const isEmptyBody_1 = __importDefault(require("../midelwares/isEmptyBody"));
const cardRouter = express_1.default.Router();
cardRouter.post('/:boardId/columns/:columnId/cards', isEmptyBody_1.default, cardsControllers_1.createCard);
cardRouter.get('/cards/', cardsControllers_1.getCards);
cardRouter.get('/:boardId/columns/:columnId/cards/:id', isValidateId_1.default, cardsControllers_1.getCardById);
cardRouter.put('/:boardId/columns/:columnId/cards/:id', isValidateId_1.default, isEmptyBody_1.default, cardsControllers_1.updateCard);
cardRouter.delete('/:boardId/columns/:columnId/cards/:id', isValidateId_1.default, cardsControllers_1.deleteCard);
cardRouter.patch('/:boardId/columns/:newColumnId/cards/dnd/:id', isValidateId_1.default, isEmptyBody_1.default, cardsControllers_1.dndMovement);
exports.default = cardRouter;
