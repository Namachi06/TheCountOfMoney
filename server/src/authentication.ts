import jwt from 'jsonwebtoken';
import config from './assets/config';
import { UserDocument } from "./database/models/userModel";
import { NextFunction, Request, Response } from "express";

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

const isAuth = (req:UserAuthRequest, res:Response, next:NextFunction) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token.' });
        return;
      }
      req.user = decode as UserDocument;
      next();
    });
  }
  res.status(401).send({ message: 'Token is not supplied.' });
};

const isAdmin = (req:UserAuthRequest, res:Response, next:NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  }
  res.status(401).send({ message: 'Not an Admin.' });
};

export { getToken, isAuth, isAdmin };
