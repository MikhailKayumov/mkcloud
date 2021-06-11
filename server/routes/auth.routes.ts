import { Router } from 'express';
import { check, validationResult, Result } from 'express-validator';
import { compareSync, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import config from 'config';
import User from '../models/User';

import { LoginReq, LoginRes, RegistrationReq, RegistrationRes } from './types';

const router = Router();

router.post(
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check(
      'password',
      'Password must be longer than 3 and shorter than 12',
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req: RegistrationReq, res: RegistrationRes) => {
    try {
      const validateErrors: Result = validationResult(req);
      if (!validateErrors.isEmpty()) {
        return res.status(400).json({
          message: 'Uncorrect request',
          errors: validateErrors.array(),
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: `User with email ${email} already exist`,
        });
      }

      const hashPassword = await hash(password, 10);

      const user = new User({
        email,
        password: hashPassword,
      });
      await user.save();

      return res.json({ message: 'Index was created' });
    } catch (e) {
      console.log(e);
      res.send({ message: 'Server error' });
    }
  },
);

router.post('/login', async (req: LoginReq, res: LoginRes) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPassValid = compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: 'Invalid login or password' });
    }

    const token = sign({ id: user.id }, config.get('secretKey'), {
      expiresIn: '30m',
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace || 0,
        usedSpace: user.usedSpace || 0,
        avatar: user.avatar || '',
        files: user.files || [],
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: 'Server error' });
  }
});

export default router;
