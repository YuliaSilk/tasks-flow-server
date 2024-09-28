import Joi from "joi";
import mongoose, { Schema, Document } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks";


interface ICard extends Document {
  title: string;
  description: string;
  columnID: Schema.Types.ObjectId;
}

const CardSchema = new Schema<ICard>(
  {
    title: { 
      type: String, 
      required: true },

    description: { 
      type: String, 
      required: true },

    columnID: { 
      type: Schema.Types.ObjectId, 
      required: true },
  },

  { versionKey: false, timestamps: true }
);
CardSchema.methods.handleSaveError = handleSaveError;
CardSchema.methods.preUpdate = preUpdate;


export const cardAddSchema = Joi.object({
  title: Joi.string().max(32).required(),
  description: Joi.string().max(10000).allow(''),
});

export const cardEditSchema = Joi.object({
  title: Joi.string().max(32).allow('').optional(),
  description: Joi.string().max(10000).allow('').optional(),
  columnID: Joi.string().optional(),
});

export const taskChangeColumnSchema = Joi.object({
  columnID: Joi.string().required(),
});

export const Card = mongoose.model<ICard>('Card', CardSchema);
