import { Request, Response } from 'express';
import Board from '../models/Board';
import { Column } from '../models/Column';
import { ColumnNames } from '../models/ColumnNames';
import mongoose from 'mongoose';
import { HttpError } from '../helpers';

interface Card {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

interface Column {
  _id: mongoose.Types.ObjectId;
  name: string;
  cards: Card[];
}

interface Board {
  _id: mongoose.Types.ObjectId;
  title: string;
  columns: Column[];
}
export const createBoard = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
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
 const resalt = await Board.findById(req.params.id);

 if (!resalt) throw new HttpError (404, "Board not found");
  res.json(resalt);
}

