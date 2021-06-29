import { Router } from 'express';

import FileController from 'controllers/FileController';

const router = Router();

router.get('', FileController.getFiles);
router.post('/createDir', FileController.createDir);
router.post('/upload', FileController.uploadFile);
router.get('/download', FileController.downloadFile);
router.delete('/delete', FileController.deleteFile);

export default router;
