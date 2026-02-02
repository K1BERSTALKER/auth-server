import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { httpResponse } from "@utils/http";
import { env } from "@config/env";

interface AuthJwtPayload {
  id: string;
}


declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return httpResponse.unauthorized(res, "User not authenticated");
  }

    // ...existing code...
  const token = authHeader.split(" ")[1];

  if (!token) {
    return httpResponse.unauthorized(res, "Token missing");
  }

  if (!env.JWT_SECRET) {
    return httpResponse.unauthorized(res, "Server misconfiguration: JWT secret missing");
  }

  const jwtSecret = env.JWT_SECRET!; // Non-null assertion
  try {
    const decoded = jwt.verify(token, jwtSecret) as unknown as AuthJwtPayload;
    req.userId = decoded.id;
    next();
  } catch (error) {
    return httpResponse.unauthorized(res, "Invalid token");
  }
}
