import Joi from "joi";
import mongoose, { Schema, model, Document } from "mongoose";
import { handleSaveError, preUpdate } from "./hooks";

export interface IBoard extends Document {
  title: string;
  columns: mongoose.Types.ObjectId[];
}

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    columns: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    }
      ],
  },

  { versionKey: false, timestamps: false }
);
BoardSchema.methods.handleSaveError = handleSaveError;
BoardSchema.methods.preUpdate = preUpdate;


export const boardAddSchema = Joi.object({
  title: Joi.string().max(32).required(),
});

export const boardEditSchema = Joi.object({
  title: Joi.string().max(32),
});

const Board = model("board", BoardSchema);

export default mongoose.model<IBoard>('Board', BoardSchema);