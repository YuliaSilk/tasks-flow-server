import { Request, Response } from 'express';
import Board from '../models/Board';
import { Column } from '../models/Column';
import { ColumnNames } from '../models/ColumnNames';
import mongoose from 'mongoose';
import { HttpError } from '../helpers';


export const createBoard = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  const existingBoard = await Board.findOne({ title });
  if (existingBoard) {
    res.status(400).json({ message: 'Board with this name already exists' });
    return 
  }
  const newBoard =  await Board.create({
    title
  });

  const todoColumn = await Column.create({ name: ColumnNames.TODO, boardID: newBoard._id });
  const inProgressColumn = await Column.create({ name: ColumnNames.IN_PROGRESS, boardID: newBoard._id });
  const doneColumn = await Column.create({ name: ColumnNames.DONE, boardID: newBoard._id });

  newBoard.columns.push(todoColumn.id, inProgressColumn.id, doneColumn.id);
  await newBoard.save();
  res.status(201).json(newBoard);
};


export const getAllBoards = async(req: Request, res: Response): Promise<void>  => {
  const resalt =  await Board.find().populate({path:"columns", select:"name",
    populate: { path: "card", select: "title description", },
  }); 
  res.json(resalt);
};

export const getBoardById = async (req: Request, res: Response): Promise<void> => {
 const resalt = await Board.findById(req.params.id).populate({path:"columns", select:"name",
  populate: { path: "card", select: "title description", },
});

 if (!resalt) throw new HttpError (404, "Board not found");
  res.json(resalt);
};

export const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const result = await Board.findByIdAndDelete(id);
  if (!result) throw new HttpError(404, "Board not found");
  res.json({ message: "Board deleted successfully" });
};


