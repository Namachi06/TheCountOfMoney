import express, { Response } from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../../authentication';

const router = express.Router();

// Update User
// /!\ Dirty isAuth as any, if you have better solution please do it. 
router.put('/:id', isAuth as any, async (req, res:Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user)
      throw ("User not found");
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.address = req.body.address || user.address;
    const updatedUser = await user.save();
    return res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } catch (error) {
    return res.status(404).send({ message: 'User Not Found' });
  }
});

// Sign-In user
router.post('/signin', async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!signinUser)
      throw "User could not be signed in.";
    return res.send({
      status: "ok",
      data: {
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      }
    });
  } catch (error) {
    return res.status(401).send({ status: "error", message: 'Invalid email or password.' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    return res.send({
      status: "ok",
      data:{
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
});

export default router;
