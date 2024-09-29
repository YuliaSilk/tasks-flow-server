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