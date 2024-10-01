import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Card } from '../models/Card';
import { Column } from '../models/Column';
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

  const { boardId, columnId } = req.params;  
  const { title, description } = req.body;

  const existingColumn = await Column.findOne({ _id: columnId, boardID: boardId });
  
  if (!existingColumn) 
  throw new HttpError(404, "Column not found");

  const newCard = await Card.create({ title, description, columnID: columnId });

  existingColumn.card.push(newCard.id);
  await existingColumn.save();

  res.status(201).json(newCard);
}

export const getCards = async (req: Request, res: Response): Promise<void> => {
  const result = await Card.find();
  res.json(result);
}

export const getCardById = async (req: Request, res: Response): Promise<void> => {
  // const result = await Card.findById(req.params.id);
  const { _id } = req.params;
  const { title, description } = req.body;
  const result = await Card.findById(_id, { title, description });
  if (!result) 
  throw new HttpError(404, "Card not found");

  res.json(result);
}

export const updateCard = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description } = req.body;

  const result = await Card.findByIdAndUpdate(id, { title, description }, { new: true, upsert: false });

  res.json(result);
}

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const { id, columnId } = req.params;

  const result = await Card.findByIdAndDelete(id);

  if (!deleteCard) 
  throw new HttpError(404, "Card not found");

  await Column.findByIdAndUpdate(columnId, { $pull: { card: id } });

  res.json({ message: 'Card deleted successfully' });

}



