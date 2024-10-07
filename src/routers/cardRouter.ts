import express from 'express';
import { createCard, getCardById, getCards, updateCard, deleteCard, dndMovement } from '../controllers/cardsControllers';
import isValidateId from '../midelwares/isValidateId';
import isEmptyBody from '../midelwares/isEmptyBody';

const cardRouter = express.Router();

cardRouter.post('/:boardId/columns/:columnId/cards',  isEmptyBody, createCard);
cardRouter.get('/cards/', getCards);
cardRouter.get('/:boardId/columns/:columnId/cards/:id', isValidateId, getCardById);
cardRouter.put('/:boardId/columns/:columnId/cards/:id', isValidateId, isEmptyBody, updateCard);
cardRouter.delete('/:boardId/columns/:columnId/cards/:id', isValidateId, deleteCard);

cardRouter.patch('/:boardId/columns/:newColumnId/cards/dnd/:id', isValidateId, isEmptyBody, dndMovement);

export default cardRouter;