import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../helpers";

const isEmptyBody = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const keys = Object.keys(req.body);

    if (!keys.length) {
        return next(new HttpError(400, 'Missing fields'));
    }

    next();
};

export default isEmptyBody;