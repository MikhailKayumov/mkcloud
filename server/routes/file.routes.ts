import { Router } from 'express';

import FileController from '../controllers/FileController';

import { checkToken } from '../middleware/auth.middleware';

const router = Router();

router.get('', checkToken, FileController.getFiles);
router.post('', checkToken, FileController.createDir);
router.post('/upload', checkToken, FileController.uploadFile);

export default router;
