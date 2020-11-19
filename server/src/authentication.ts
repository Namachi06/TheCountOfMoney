import jwt from 'jsonwebtoken';
import config from './assets/config';
import { UserDocument } from "./database/models/userModel";
import { Request, Response } from "express";

export interface UserAuthRequest extends Request
{
  user:UserDocument;
}

const getToken = (user:UserDocument) => jwt.sign({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin,
}, config.JWT_SECRET, {
  expiresIn: '48h',
});

const isAuth = (req:UserAuthRequest, res:Response, next:Function) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode:UserDocument) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token.' });
      }
      req.user = decode;
      next();
    });
  }
  return res.status(401).send({ message: 'Token is not supplied.' });
};

const isAdmin = (req:UserAuthRequest, res:Response, next:Function) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Not an Admin.' });
};

export { getToken, isAuth, isAdmin };
