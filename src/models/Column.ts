import Joi from "joi";
import { Schema, model, Document } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks";
import { ICard } from "./Card";


export interface IColumn extends Document {
  name: string;
  card: ICard[];
  cards: ICard[];
  boardID: Schema.Types.ObjectId;
}

const ColumnSchema = new Schema<IColumn>(
  {
    name: {
      type: String,
      required: [true, "Set name for column"],
    },
   
    card: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
        
      },],

    boardID: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

ColumnSchema.methods.handleSaveError = handleSaveError;
ColumnSchema.methods.preUpdate = preUpdate;

export const Column = model<IColumn>("Column", ColumnSchema);

export const columnAddSchema = Joi.object({
  name: Joi.string().max(32).required(),
});

