import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const isValidateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
         res.status(400).json({ message: 'Invalid ID format you entered' });
         return;
    }
    next();
}

export default isValidateId;

// import { Request, Response, NextFunction } from "express";
// // import { isValidObjectId } from "mongoose";
// import { HttpError } from "../helpers";

// const isValidateId = (req: Request, res: Response, next: NextFunction): void => {
//   const { id } = req.params;

//   if (!id) {
//     return next(new HttpError(400, `${id} is not a valid Id`));
//   }
  
//   next();
// };

// export default isValidateId;