import { Router } from 'express';
import { body } from 'express-validator';

import AuthController from 'controllers/AuthController';

const router = Router();

const regHandlers = [
  body('email', 'Не верный email.').isEmail(),
  body('firstname', 'Не задано имя.').notEmpty(),
  body('lastname', 'Не задана фамилия.').notEmpty(),
  body('password', 'Пароль должен быть от 3 до 12 символов.').isLength({
    min: 3,
    max: 12
  })
];

router.get('/refresh', AuthController.refresh.bind(AuthController));
router.get('/logout', AuthController.logout.bind(AuthController));
router.post('/login', AuthController.login.bind(AuthController));
router.post(
  '/registration',
  regHandlers,
  AuthController.registration.bind(AuthController)
);

export default router;
