import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Card } from '../models/Card';
import Board from '../models/Board';
import { Column, IColumn } from '../models/Column';
import { HttpError } from '../helpers';

const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const ColumnSchema = new mongoose.Schema({
  name: String,
  cards: [CardSchema],
});

const BoardSchema = new mongoose.Schema({
  title: String,
  columns: [ColumnSchema],
});

export const createCard = async (req: Request, res: Response): Promise<void> => {
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  const { boardId, columnId } = req.params;  
  const { title, description } = req.body;

  console.log("Received:", req.params);
  console.log("Received columnId:", columnId);

  const existingColumn = await Column.findOne({ _id: columnId, boardID: boardId });
  if (!existingColumn) {
    res.status(404).json({ message: 'Column not found' });
    return;
  }

  const newCard = await Card.create({ title, description, columnID: columnId });

  existingColumn.card.push(newCard.id);
  await existingColumn.save();

  res.status(201).json(newCard);
}
