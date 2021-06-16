import express from 'express';
import mongo from 'mongoose';
import fileUpload from 'express-fileupload';
import config from 'config';

// routes
import AuthRouter from './routes/auth.routes';
import FileRouter from './routes/file.routes';

import { cors } from './middleware/cors.middleware';
import { apiPath } from './utils/apiPath';

const PORT = config.get<number>('serverPort');
const DB_URL = config.get<string>('dbUrl');

const app = express();

app.use(cors);
app.use(fileUpload({}));
app.use(express.json());
app.use(apiPath('auth'), AuthRouter);
app.use(apiPath('file'), FileRouter);

const start = async () => {
  try {
    await mongo.connect(DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await app.listen(PORT);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start().then(() => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
