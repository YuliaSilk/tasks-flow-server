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
  const { id, boardId } = req.params;
  const { finishCardIndex, finishColumnID } = req.body;

  console.log(`Moving card ${id} to column ${finishColumnID} at index ${finishCardIndex}`);

  const card = await Card.findById(id);
  if (!card) throw new HttpError(404, "You are trying to move a non-existing card");

  const startColumnID = card.columnID;

  await Column.findByIdAndUpdate(startColumnID, { $pull: { cards: id } });

  const finishColumn = await Column.findById(finishColumnID);
    if (!finishColumn) {
    console.log(`Finish column not found: ${finishColumnID}`);
    throw new HttpError(404, "Finish column not found");
    }

  const startColumn = await Column.findById(startColumnID);
    if (!startColumn) {
    console.log(`Start column not found: ${startColumnID}`);
    throw new HttpError(404, "Start column not found");
    }

    if (startColumnID !== finishColumnID) {
    await Column.findByIdAndUpdate(startColumnID, { $pull: { cards: card._id  } });
    }

    if (startColumnID === finishColumnID) {
      console.log('Moving card within the same column');

      finishColumn.cards = finishColumn.cards.filter(c => c.toString() !== card.id.toString());
      finishColumn.cards.splice(finishCardIndex, 0, card.id);

      await finishColumn.save();
      res.json({ card, finishCardIndex, startColumnID, finishColumnID });
    return 
    }

    if (!finishColumn.cards) {
       finishColumn.cards = [];
    }

  finishColumn.cards.splice(finishCardIndex, 0, card );
  await finishColumn.save();

  card.columnID = finishColumnID;
  await card.save();

  res.json({ card, finishCardIndex, startColumnID, finishColumnID });
};
