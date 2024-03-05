import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';
import nodemailer from 'nodemailer';
import verifyForgotPassword from '../middleware/verifyForgotPw';
import * as crypto from 'crypto';
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_API_SMTP,
    pass: process.env.PWD_API_SMTP
  }
});

function createSHA3Hash(data: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha3-512').update(data).digest('hex');
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
}

router.post(
  '/login',
  [
    check('email', 'Email is required!').isEmail(),
    check('password', 'Password with 8 or more characters required!')
      .trim()
      .isLength({min: 8})
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
      const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d'
        }
      );

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

router.post(
  '/forgotpassword',
  [check('email', 'Email is required!').isEmail()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    const {email} = req.body;
    try {
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({
          message: 'User not found!'
        });
      }
      const token = jwt.sign(
        {userForgotId: user._id},
        process.env.JWT_FORGOT_SECRET_KEY as string,
        {
          expiresIn: '5m'
        }
      );

      const info = await transporter.sendMail({
        from: '"Holly Security Booking 👨‍✈️" <thinhofdakh@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Confirm your password reset, valid for 5 minutes ✅', // Subject line
        html: `<h2 style="color:red">If you do not request a new password change, please do not click anywhere in this email</h2>
        If you want to change a new password for your account, click <a href="http://localhost:8888/api/auth/verifyForgotPassword?token=${token}" target="_blank">here</a>` // html body
      });
      user.save();

      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(500).send({message: 'Something went wrong!'});
    }
  }
);

router.post(
  '/verifyForgotPassword',
  [
    check('newPassword', 'New password with 8 or more characters required!')
      .trim()
      .isLength({min: 8}),
    check('reNewPassword', 'Renew password with 8 or more characters required!')
      .trim()
      .isLength({min: 8})
  ],
  verifyForgotPassword,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    const {newPassword, reNewPassword} = req.body;
    try {
      if (newPassword !== reNewPassword) {
        return res.status(400).json({
          message: `New password don't match renew password!`
        });
      }
      const user = await User.findOne({_id: req.userForgotId});
      if (!user) {
        return res.status(400).json({
          message: `Can not find user. Please try again!`
        });
      }

      user.password = newPassword;
      user.save();

      res.status(200).send();
    } catch (error) {
      console.log(error);
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
