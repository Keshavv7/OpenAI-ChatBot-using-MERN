import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import appRouter from './Routes/index.js';
import cookieParser from 'cookie-parser';
// Configuring env variables
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// Remove in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map