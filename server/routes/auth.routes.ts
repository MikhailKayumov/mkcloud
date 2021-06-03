import { Request, Response, Router } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import { hash } from 'bcrypt';

import User from '../models/User';

const router = Router();

router.post(
  '/registration',
  [
    check('email', 'Uncorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 })
  ],
  async (req: Request<RegistrationReq>, res: Response<RegistrationRes>) => {
    try {
      const validateErrors: Result = validationResult(req);
      if (!validateErrors.isEmpty()) {
        return res.status(400).json({
          message: 'Uncorrect request',
          errors: validateErrors.array()
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: `User with email ${email} already exist`
        });
      }

      const hashPassword = await hash(password, 10);

      const user = new User({
        email,
        password: hashPassword
      });
      await user.save();

      return res.json({ message: 'Index was created' });
    } catch (e) {
      console.log(e);
      res.send({ message: 'Server error' });
    }
  }
);

export default router;

type RegistrationReq = {
  email: string;
  password: string;
};

type RegistrationRes = {
  message: string;
  errors?: ValidationError[];
};
