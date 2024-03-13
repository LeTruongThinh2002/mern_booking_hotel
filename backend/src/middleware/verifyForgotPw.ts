import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userForgotId: string;
    }
  }
}

const verifyForgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {token} = req.body;
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized token'
    });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_FORGOT_SECRET_KEY as string
    );
    req.userForgotId = (decoded as JwtPayload).userForgotId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

export default verifyForgotPassword;
