import express from 'express';
import dotenv from 'dotenv';
// Configuring env variables
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
export default app;
//# sourceMappingURL=app.js.map