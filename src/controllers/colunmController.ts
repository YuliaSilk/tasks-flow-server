import { Request, Response } from 'express';
import { Column } from '../models/Column';
import Board, { IBoard } from '../models/Board';
import HttpError from 'http-errors';
import { Card } from '../models/Card';

export const createColumn = async (req: Request, res: Response): Promise<void> => {
    const { id: boardID } = req.params;
    const { name } = req.body;
    const existingBoard = await Board.findOne({ _id: boardID }) as IBoard;
   
    if (!existingBoard) throw HttpError(404, "You trying to add column to unexisting board");

    const existingColumns = await Column.find({ boardID });
    const columnNames = existingColumns.map(column => column.name);

    if (columnNames.length >= 3) 
    throw HttpError(400, "You can't add more than 3 columns");

    if (columnNames.includes(name)) 
    throw HttpError(400, "Column with this name already exists");

    const newColumn = await Column.create({ name, boardID });
    existingBoard.columns.push(newColumn.id );
    await existingBoard.save();
    
    res.status(201).json(newColumn);
}
export const getAllColumns = async (req: Request, res: Response): Promise<void> => {
    const columns = await Column.find()
    res.json(columns);
}
export const getAllColumnsByBoardId = async (req: Request, res: Response): Promise<void> => {
    const { boardID } = req.params;
    const columns = await Column.find({ _id: boardID });
  
    if (!columns) throw HttpError(404, "Columns not found");
    res.json(columns);
  }
export const getColumnById = async (req: Request, res: Response): Promise<void> => {
    const { boardID, columnID } = req.params;
  
    const board = await Board.findOne({ _id: boardID });
    if (!board) throw HttpError(404, "Board not found");
  
    const column = await Column.findOne({ _id: columnID, boardID });
    if (!column) throw HttpError(404, "Column not found");
    
    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    console.log("Request Query:", req.query);
    res.json(column);
  };


  // export const moveCardToColumn = async (req: Request, res: Response): Promise<void> => {
  //   const { boardId, columnId, cardId } = req.params;
  //   const { newColumnId } = req.body;
  
  //   const card = await Card.findById(cardId);
  //   if (!card) throw HttpError(404, "Card not found");
  
  //   const currentColumn = await Column.findById(columnId);
  //   if (!currentColumn) throw HttpError(404, "Current column not found");
  
  //   const newColumn = await Column.findById(newColumnId);
  //   if (!newColumn) throw HttpError(404, "New column not found");
  
  //   // Видалити картку з поточної колонки
  //   await Column.updateOne({ _id: columnId }, { $pull: { cards: cardId } });
  
  //   // Додати картку в нову колонку
  //   newColumn.card.push(card._id);
  //   await newColumn.save();
  
  //   // Оновити колонку картки
  //   card.columnID = newColumnId;
  //   await card.save();
  
  //   res.json({ message: 'Card moved successfully' });
  // };