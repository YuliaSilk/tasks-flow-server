"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardControllers_1 = require("../controllers/boardControllers");
const midelwares_1 = require("../midelwares");
const columnRouter_1 = __importDefault(require("./columnRouter"));
const boardRouter = express_1.default.Router();
boardRouter.get('/', boardControllers_1.getAllBoards);
boardRouter.get('/:id', midelwares_1.isValidateId, boardControllers_1.getBoardById);
boardRouter.post('/', midelwares_1.isEmptyBody, boardControllers_1.createBoard);
// boardRouter.delete('/:id', isValidateId, deleteBoard);  
boardRouter.use('/:id', columnRouter_1.default);
exports.default = boardRouter;
