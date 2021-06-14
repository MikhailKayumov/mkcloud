import { Router } from 'express';

import FileController from '../controllers/FileController';

import { checkToken } from '../middleware/auth.middleware';

const router = Router();

router.post('', checkToken, FileController.createDir);
router.get('', checkToken, FileController.getFiles);

export default router;
