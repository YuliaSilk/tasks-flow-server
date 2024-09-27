import express from 'express';
import cardRoutes from './src/routers/card-router';
import boardRoutes from './src/routers/board-router';
import { DB_HOST, PORT } from './config';
import mongoose from 'mongoose';

mongoose.connect(DB_HOST)
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
.catch((error) => {
    console.log(error.message)
    process.exit(1)
})
const app = express();
app.use(express.json());

app.use('/api', boardRoutes);
app.use('/api', cardRoutes);


