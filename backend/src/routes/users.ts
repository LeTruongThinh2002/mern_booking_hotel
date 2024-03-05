import express, {Request, Response} from 'express';
import {check, validationResult} from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';
import nodemailer from 'nodemailer';
import verifyTokenEmail from '../middleware/verify';

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

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Something went wrong'});
  }
});

//change first, last name
router.post(
  '/changeName',
  verifyToken,
  [
    check('firstName', 'First name is required!')
      .trim()
      .isString()
      .isLength({min: 1}),
    check('lastName', 'Last name is required!')
      .trim()
      .isString()
      .isLength({min: 1})
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    const {firstName, lastName} = req.body;

    try {
      let user = await User.findOne({_id: req.userId});
      if (!user) {
        return res.status(400).json({
          message: 'User not found!'
        });
      }
      user.firstName = firstName;
      user.lastName = lastName;
      user.save();

      res.status(200).send({message: 'Change Info Successfully!'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Something went wrong'});
    }
  }
);

//change email with password

router.post(
  '/changeEmail',
  verifyToken,
  [
    check('password', 'Password with 8 or more characters required!')
      .trim()
      .isLength({min: 8}),
    check('email', 'Email is required!').isEmail()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    const {email, password} = req.body;

    try {
      let user = await User.findOne({_id: req.userId});
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
      if (user.email !== email) {
        user.email = email;
        user.verify = false;
        const token = jwt.sign(
          {email: user.email},
          process.env.JWT_SECRET_KEY as string,
          {
            expiresIn: '5m'
          }
        );
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Holly Security Booking 👨‍✈️" <thinhofdakh@gmail.com>', // sender address
          to: email, // list of receivers
          subject: 'Verify your new email ✅', // Subject line
          html: `<a href="http://localhost:8888/api/users/verify?token=${token}" target="_blank">Click here to verify your email!</a>` // html body
        });
      }
      user.save();
      res.status(200).send({message: 'Change Info Successfully!'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Something went wrong'});
    }
  }
);

//send token to email user by button verify email in frontend
router.post(
  '/verifyEmail',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({_id: req.userId});
      if (!user) {
        return res.status(400).json({
          message: 'User not found!'
        });
      }
      if (user.verify === true) {
        return res.status(200).send();
      }
      const token = jwt.sign(
        {email: user.email},
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '5m'
        }
      );
      const info = await transporter.sendMail({
        from: '"Holly Security Booking 👨‍✈️" <thinhofdakh@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Verify your new email ✅', // Subject line
        html: `<a href="http://localhost:8888/api/users/verify?token=${token}" target="_blank">Click here to verify your email!</a>` // html body
      });

      res.status(200).send({message: 'Verify email already send!'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Something went wrong'});
    }
  }
);

//input token from email link and verify
router.post(
  '/verify',
  verifyTokenEmail,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({email: req.email});
      if (!user) {
        return res.status(400).json({
          message: 'User not found!'
        });
      }
      user.verify = true;
      user.save();
      res.status(200).send({message: 'Verify Successfully!'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Something went wrong'});
    }
  }
);

//change password with new password and renew password
router.post(
  '/changePassword',
  verifyToken,
  [
    check('password', 'Password with 8 or more characters required!')
      .trim()
      .isLength({min: 8}),
    check('newPassword', 'New password with 8 or more characters required!')
      .trim()
      .isLength({min: 8}),
    check('reNewPassword', 'Renew password with 8 or more characters required!')
      .trim()
      .isLength({min: 8})
  ],
  async (req: Request, res: Response) => {
    //check input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({message: errors.array()});
    }
    //get request value
    const {password, newPassword, reNewPassword} = req.body;

    try {
      //check newpassword and renewpassword
      if (newPassword !== reNewPassword) {
        return res.status(400).json({
          message: `New password don't match renew password!`
        });
      }
      //get user from userId in token match
      let user = await User.findOne({_id: req.userId});
      if (!user) {
        return res.status(400).json({
          message: `Can not find user. Please try again!`
        });
      }
      //check password user with password db
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (!isMatchPassword) {
        return res.status(400).json({
          message: 'Invalid password!'
        });
      }
      //change password and save
      user.password = newPassword;
      user.save();
      //login again with the new password
      res.cookie('auth_token', '', {
        expires: new Date(0)
      });

      res.status(200).send({message: 'Change password successfully!'});
    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Something went wrong'});
    }
  }
);

//register user
router.post(
  '/register',
  [
    check('firstName', 'First Name is required!')
      .trim()
      .isString()
      .isLength({min: 1}),
    check('lastName', 'Last Name is required!')
      .trim()
      .isString()
      .isLength({min: 1}),
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

      const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: '1d'
        }
      );
      const info = await transporter.sendMail({
        from: '"Holly Security Booking 👨‍✈️" <thinhofdakh@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Verify your new email ✅', // Subject line
        html: `<a href="http://localhost:8888/api/users/verify?token=${token}" target="_blank">Click here to verify your email!</a>` // html body
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
