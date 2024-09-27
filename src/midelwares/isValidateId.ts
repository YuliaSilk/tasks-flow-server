import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { HttpError } from "../../helpers";

const isValidateId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(new HttpError(400, `${id} is not a valid Id`));
  }
  
  next();
};

export default isValidateId;