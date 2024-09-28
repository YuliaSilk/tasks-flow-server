import { Request, Response } from 'express';
import { Column } from '../models/Column';
import Board, { IBoard } from '../models/Board';
import HttpError from 'http-errors';
import { ColumnNames } from '../models/ColumnNames';

export const createColumn = async (req: Request, res: Response): Promise<void> => {

    const { id: boardID } = req.params;
    const { name } = req.body;

    console.log("Received:", req.params);
    console.log("Received boardID:", boardID);

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

export const getAllColumnById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const column = await Column.findById(id)
    if (!column) throw HttpError(404, "Column not found");
    res.json(column);
}

export const getColumnById = async (req: Request, res: Response): Promise<void> => {
    const { boardID, columnID } = req.params;
  
    const board = await Board.findOne({ _id: boardID });
    if (!board) throw HttpError(404, "Board not found");
  
    const column = await Column.findOne({ _id: columnID, boardID });
    if (!column) throw HttpError(404, "Column not found");
  
    res.json(column);
  };