import express from 'express';
import {  createBoard, getAllBoards, getBoardById } from '../controllers/boardControllers';
import { isEmptyBody, isValidateId } from '../midelwares';
import columnRouter from './columnRouter';

const boardRouter = express.Router();

boardRouter.get('/', getAllBoards);   
boardRouter.get('/:id', isValidateId, getBoardById);
boardRouter.post('/', isEmptyBody, createBoard);        
// boardRouter.delete('/:id', isValidateId, deleteBoard);  
boardRouter.use('/:id', columnRouter);

export default boardRouter;