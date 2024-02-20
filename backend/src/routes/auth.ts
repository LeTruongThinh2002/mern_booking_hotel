import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Email is required!').isEmail(),
    check('password', 'Password with 8 or more characters required!').trim().isLength({min: 8})
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    const {email, password} = req.body;

    try {
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({
          message: 'User not found!'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid password!'
        });
      }
      const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d'
      });

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000
      });

      res.status(200).json({userId: user._id});
    } catch (err) {
      console.log(err);
      res.status(500).send({message: 'Something went wrong!'});
    }
  }
);

router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).send({userId: req.userId});
});

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0)
  });
  res.send();
});

export default router;
