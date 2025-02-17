import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Card, ICard } from '../models/Card';
import { Column } from '../models/Column';
import { HttpError } from '../helpers';


// const CardSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   columnID: { type: mongoose.Types.ObjectId, ref: 'Column' }, 
//   boardID: { type: mongoose.Types.ObjectId, ref: 'Board' },
// });

// const ColumnSchema = new mongoose.Schema({
//   name: String,
//   cards: [CardSchema],
// });

export const createCard = async (req: Request, res: Response): Promise<void> => {

  const { boardId, columnId } = req.params;  
  const { title, description } = req.body;

  const newColumn = await Column.findOne({ _id: columnId, boardID: boardId });
  
  if (!newColumn) 
  throw new HttpError(404, "Column not found");

  const newCard = await Card.create({ title, description, columnID: columnId, boardID: boardId });

  newColumn.card.push(newCard.id);
  await newColumn.save();

  res.status(201).json(newCard);
}

export const getCards = async (req: Request, res: Response): Promise<void> => {
  const result = await Card.find();
  res.json(result);
}

export const getCardById = async (req: Request, res: Response): Promise<void> => {
  const result = await Card.findById(req.params.id);
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

  if (!result) 
  throw new HttpError(404, "Card not found");

  await Column.findByIdAndUpdate(columnId, { $pull: { card: id } });

  res.json({ message: 'Card deleted successfully' });
}

export const dndMovement = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;  
  const { finishCardIndex, finishColumnID } = req.body;  
  const card = await Card.findById(id);

  if (!card || !('columnID' in card)) {
    throw new HttpError(404, "Card not found or invalid type");
  }

  const startColumnID = card.columnID; 

  await Column.findByIdAndUpdate(startColumnID, { $pull: { card: card._id } });

  const finishColumn = await Column.findById(finishColumnID);
  if (!finishColumn) throw new HttpError(404, "Finish column not found");

  await Column.findByIdAndUpdate(finishColumnID, { 
    $push: { card: { $each: [card._id], $position: finishCardIndex } } 
  });

  card.columnID = finishColumnID;
  await card.save();

  res.json({ card, startColumnID, finishColumnID });
};