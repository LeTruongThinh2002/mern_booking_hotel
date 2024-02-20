import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', 'First Name is required!').trim().isString().isLength({min: 1}),
    check('lastName', 'Last Name is required!').isString().isLength({min: 1}),
    check('email', 'Email is required!').isEmail(),
    check('password', 'Password with 8 or more characters required!').trim().isLength({min: 8})
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    try {
      let user = await User.findOne({
        email: req.body.email
      });
      if (user) {
        return res.status(400).json({
          message: 'User already exists'
        });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d'
      });
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000
      });
      res.status(200).send({message: 'Registers successfully'});
    } catch (err) {
      console.log(err);
      res.status(500).send({message: 'Something went wrong!'});
    }
  }
);

export default router;
