import express from 'express';
import { createCard } from '../controllers/cardsControllers';
// import isValidateId from '../midelwares/isValidateId';
import isEmptyBody from '../midelwares/isEmptyBody';

const cardRouter = express.Router();

cardRouter.post('/:boardId/columns/:columnId/cards',  isEmptyBody, createCard);// cardRouter.post('/boards/:boardId/columns/:columnId/cards', isValidateId, isEmptyBody, createCard);
// cardRouter.get('/boards/:boardId/columns/:columnId/cards', isValidateId, getCards);
// cardRouter.put('/cards/:cardId', isValidateId, isEmptyBody, updateCard);
// cardRouter.delete('/cards/:cardId', isValidateId, isEmptyBody, deleteCard);
// cardRouter.get('/cards/', getAllCards);
// cardRouter.get('/:boardId/columns/:columnId/cards', isValidateId, getCards);
// cardRouter.put('/cards/:cardId', isValidateId, isEmptyBody, updateCard);
// cardRouter.delete('/cards/:cardId', isValidateId, isEmptyBody, deleteCard);

export default cardRouter;