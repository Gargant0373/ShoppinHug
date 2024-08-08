import express, { NextFunction, Request, Response } from 'express';
import indexRouter from './routes/index';
import cartRouter from './routes/carts';
import userRouter from './routes/user';

const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());
app.options('*', cors());

// Routes
app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/shop', cartRouter);

// Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

export default app;