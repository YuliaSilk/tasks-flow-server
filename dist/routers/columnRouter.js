"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const midelwares_1 = require("../midelwares");
const colunmController_1 = require("../controllers/colunmController");
const columnRouter = express_1.default.Router();
columnRouter.post('/boards/:id/columns', midelwares_1.isEmptyBody, colunmController_1.createColumn);
columnRouter.get('/:id', colunmController_1.getAllColumns);
columnRouter.get('/boards/:id/columns', colunmController_1.getAllColumnsByBoardId);
columnRouter.get('/boards/:boardID/columns/:columnID', colunmController_1.getColumnById);
exports.default = columnRouter;
