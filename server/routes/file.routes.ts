import { Router } from 'express';

import FileController from '../controllers/FileController';

import { auth } from '../middleware/auth.middleware';

const router = Router();

router.get('', auth, FileController.getFiles);
router.post('', auth, FileController.createDir);
router.post('/upload', auth, FileController.uploadFile);
router.get('/download', auth, FileController.downloadFile);
router.delete('/delete', auth, FileController.deleteFile);

export default router;
