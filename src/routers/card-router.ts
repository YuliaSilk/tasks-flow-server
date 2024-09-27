import express from 'express';
import { createCard, updateCard, deleteCard } from '../controllers/cards-controllers';
import isValidateId from '../midelwares/isValidateId';
import isEmptyBody from '../midelwares/isEmptyBody';
// import validateBody from '../decorators/validateBody';
// import { cardAddSchema, cardEditSchema } from '../models/Card';

const cardRouter = express.Router();

cardRouter.post('/:id', isValidateId, isEmptyBody,  createCard);
cardRouter.get('/cards',isValidateId, isEmptyBody, createCard);      
cardRouter.put('/:id',isValidateId, isEmptyBody,  updateCard);       
cardRouter.delete('/:id',isValidateId, isEmptyBody, deleteCard);    

export default cardRouter;


