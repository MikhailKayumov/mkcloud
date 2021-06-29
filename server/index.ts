import path from 'path';
import config from 'config';
import express from 'express';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import mongo from 'mongoose';

// routes
import AuthRouter from 'routes/auth.routes';
import FileRouter from 'routes/file.routes';

import { apiPath } from 'utils/apiPath';
import { corsMiddleware } from 'middleware/cors.middleware';
import { authMiddleware } from 'middleware/auth.middleware';
import { errorMiddleware } from 'middleware/error.middleware';

const PORT = config.get<number>('serverPort');
const DB_URL = config.get<string>('dbUrl');
const STATIC_PATH = path.resolve('static');
const AUTH_CHECK_PATHS = [apiPath('file')];
const FILE_UPLOAD_OPTS = {
  useTempFiles: true,
  tempFileDir: path.resolve('userFiles/tempFileDir')
};

const app = express();

app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload(FILE_UPLOAD_OPTS));
app.use(express.static(STATIC_PATH));
app.use(AUTH_CHECK_PATHS, authMiddleware);
app.use(apiPath('auth'), AuthRouter);
app.use(apiPath('file'), FileRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongo.connect(DB_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await app.listen(PORT);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start().then(() => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
