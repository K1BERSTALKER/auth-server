import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@models/userModel";
import { httpResponse } from "@utils/http";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return httpResponse.badRequest(res, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return httpResponse.unauthorized(res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return httpResponse.created(
      res,
      {
        token,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      "User registered successfully",
    );
  } catch (error) {
    console.error(error);
    return httpResponse.serverError(res, "Something went wrong");
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return httpResponse.badRequest(res, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return httpResponse.notFound(res, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return httpResponse.unauthorized(res, "Password invalid");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return httpResponse.ok(
      res,
      {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      "Login successful",
    );
  } catch (error) {
    console.error(error);
    return httpResponse.serverError(res, "Something went wrong");
  }
};

export const logout = async (req: Request, res: Response) => {
  // Since JWT is stateless, logout can be handled on the client side by deleting the token.
  return httpResponse.ok(res, null, "Logout successful");
};

export const getProfile = async (req: Request, res: Response) => {
  if (!req.userId) {
    return httpResponse.unauthorized(res, "User not authenticated");
  }

  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return httpResponse.notFound(res, "User not found");
    }

    return httpResponse.ok(res, user, "User profile fetched successfully");
  } catch (error) {
    console.error(error);
    return httpResponse.serverError(res, "Something went wrong");
  }
};
