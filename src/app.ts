import express, { Application, Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";

import boardRouter from './routers/board-router';
import cardRouter from './routers/card-router';
import { DB_HOST, PORT } from '../config';

dotenv.config();

const app: Application = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 


app.use('/api/boards', boardRouter);
app.use('/api/cards', cardRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({ message: err.message });
});

app.post('/api/cards', (req: Request, res: Response) => {
  const { title, description } = req.body;

  console.log(`Title: ${title}, Description: ${description}`);
  
  res.status(200).json({ message: 'Дані отримано успішно' });
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))
export default app;

// import express, { Request, Response } from 'express';

// const app = express();
// const port = 3000;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello, TypeScript with Express!');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// require('dotenv').config();
