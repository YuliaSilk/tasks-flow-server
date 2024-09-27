import Joi from "joi";
import { Schema, model, Document } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks";

const priorityList = ["Without", "Low", "Medium", "High"] as const;

interface ICard extends Document {
  title: string;
  description?: string;
  columnID: Schema.Types.ObjectId;
}

const cardSchema = new Schema<ICard>(
  {
    title: {
      type: String,
      required: [true, "Set title for task"],
    },
    description: {
      type: String,
      default: '',
    },
    columnID: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: true,
    },
  },
  { versionKey: false, timestamps: true } 
);
cardSchema.methods.handleSaveError = handleSaveError;
cardSchema.methods.preUpdate = preUpdate;
// cardSchema.post("save", handleSaveError);
// cardSchema.pre("findOneAndUpdate", preUpdate);

export const cardAddSchema = Joi.object({
  title: Joi.string().max(32).required(),
  description: Joi.string().max(88).allow(''),
  priority: Joi.string().valid(...priorityList),
  deadline: Joi.string(),
});

export const cardEditSchema = Joi.object({
  title: Joi.string().max(32).allow('').optional(),
  description: Joi.string().max(88).allow('').optional(),
  columnID: Joi.string().optional(),
});

export const taskChangeColumnSchema = Joi.object({
  columnID: Joi.string().required(),
});

const Card = model<ICard>("task", cardSchema);

export default Card;