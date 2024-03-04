import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      email: string;
    }
  }
}

const verifyTokenEmail = (req: Request, res: Response, next: NextFunction) => {
  const token = req.query.token as string;
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized token'
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.email = (decoded as JwtPayload).email;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }
};

export default verifyTokenEmail;
