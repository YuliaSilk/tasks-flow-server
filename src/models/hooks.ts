import mongoose, { CallbackError, Document,  } from "mongoose";
import { NextFunction } from "express";

export const handleSaveError = (error: CallbackError, _: Document, next: NextFunction) => {
    if (error instanceof Error && 'name' in error && 'code' in error) {
        const { name, code } = error as { name: string; code: number };
        
        (error as any).status = name === "MongoServerError" && code === 11000 ? 409 : 400;
    }
    next();
};

export const preUpdate = function (this: any, next: NextFunction) {
    if (this instanceof mongoose.Model) {
        this.options.new = true;
        this.options.runValidators = true;
    }
    next();
};