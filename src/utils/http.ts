import { Response } from 'express';

export const httpResponse = {
  // Success responses
  ok: (res: Response, data?: any, message?: string) => {
    return res.status(200).json({ message: message || 'OK', data });
  },
  created: (res: Response, data?: any, message?: string) => {
    return res.status(201).json({ message: message || 'Created', data });
  },

  // Client errors
  badRequest: (res: Response, message?: string, data?: any) => {
    return res.status(400).json({ message: message || 'Bad Request', data });
  },
  unauthorized: (res: Response, message?: string, data?: any) => {
    return res.status(401).json({ message: message || 'Unauthorized', data });
  },
  forbidden: (res: Response, message?: string, data?: any) => {
    return res.status(403).json({ message: message || 'Forbidden', data });
  },
  notFound: (res: Response, message?: string, data?: any) => {
    return res.status(404).json({ message: message || 'Not Found', data });
  },

  // Server errors
  serverError: (res: Response, message?: string, data?: any) => {
    return res.status(500).json({ message: message || 'Server Error', data });
  },
};
