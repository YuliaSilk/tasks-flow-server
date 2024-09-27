import express from 'express';
import { getBoardById, createBoard, updateBoard, deleteBoard } from '../controllers/board-controllers';
// import { boardAddSchema, boardEditSchema } from '../models/Board';
// import validateBody from '../decorators/validateBody';
import { isEmptyBody, isValidateId } from '../midelwares';

const boardRouter = express.Router();

boardRouter.get('/boards/:id', isValidateId, isEmptyBody,  getBoardById);   
boardRouter.get('/boards', isEmptyBody, getBoardById);
boardRouter.post('/:id', isValidateId, isEmptyBody,  createBoard);        
boardRouter.put('/boards/:id', isValidateId, isEmptyBody, updateBoard);     
boardRouter.delete('/boards/:id', isValidateId, isEmptyBody, deleteBoard);  

export default boardRouter;