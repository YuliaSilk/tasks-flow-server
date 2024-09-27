import { Request, Response, NextFunction } from "express";

const validateBody = (scheme: any) => {
    const func = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error } = scheme.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            next();
        } catch (err) {
            next(err);
        }
    };
    return func;
};

export default validateBody;

