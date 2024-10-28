import { Request, Response } from "express";
import {
  IUser,
  getUserByEmail,
  addUser,
  hashPassword,
  comparePassword,
} from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  if (getUserByEmail(email)) {
    res.status(400).json({
      status: 400,
      message: "User already exists",
    });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser: IUser = {
    id: Date.now(),
    username,
    email,
    password: hashedPassword,
  };
  addUser(newUser);

  res.status(201).json({
    message: "User created successfully",
    status: 201,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!user || !(await comparePassword(password, user.password))) {
    res.status(400).json({ status: 400, message: "Invalid email or password" });
    return;
  }

  const token = generateToken(user.id);
  res.status(200).json({ token });
};
