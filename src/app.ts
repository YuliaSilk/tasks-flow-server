import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import mongoose from 'mongoose';
import { DB_HOST, PORT } from './config';


import boardRouter from './routers/boardRouter';
import columnRouter from './routers/columnRouter';
import cardRouter from './routers/cardRouter';


dotenv.config();

const app: Application = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api/boards', boardRouter);
app.use('/api', columnRouter);
app.use('/api/boards', cardRouter);



app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ message: err.message });
});
mongoose.connect(DB_HOST)
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
})
.catch((error) => {
    console.log(error.message || "An error occurred while connecting to the database");
    process.exit(1)
})

export default app;

