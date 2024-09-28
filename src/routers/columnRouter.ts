import express from 'express';
import { isEmptyBody } from '../midelwares';
import { createColumn, getAllColumns, getAllColumnById, getColumnById } from '../controllers/colunmController';

const columnRouter = express.Router();

columnRouter.post('/boards/:id/columns', isEmptyBody, createColumn); 
columnRouter.get('/:id', getAllColumns);   
columnRouter.get('/boards/:id/columns', getAllColumnById); //get all columns form all boards
columnRouter.get('/boards/:boardID/columns/:columnID', getColumnById);
export default columnRouter;