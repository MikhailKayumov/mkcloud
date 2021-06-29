import { Router } from 'express';

import FileController from 'controllers/FileController';

const router = Router();

router.get('', FileController.getFiles);
router.post('/createDir', FileController.createDir);
router.post('/upload', FileController.uploadFile);
router.post('/avatar', FileController.uploadAvatar);
router.get('/download', FileController.downloadFile);
router.delete('/delete', FileController.deleteFile);
router.delete('/avatar', FileController.deleteAvatar);

export default router;
