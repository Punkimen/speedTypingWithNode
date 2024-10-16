import express, {Express, Request, Response} from 'express';
import {connect} from './db/db_connect';
import bodyParser from "body-parser";
import userRoutes from './routes/user-route';
import profileRoutes from './routes/profile-route';
import lessonsRoutes from './routes/lessons-route';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from "./routes/auth-route";

dotenv.config({ path: '.env.local' });

const app: Express = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || '5000';
app.get('/', (req: Request, res: Response) => {
  res.send("Express start server")
})

app.use('/', userRoutes)
app.use('/profile', profileRoutes)
app.use('/lessons', lessonsRoutes)
app.use('/auth', authRoutes)

app.listen(port, async () => {
  await connect();
  console.log(`server start on Port=${port}`)
})

