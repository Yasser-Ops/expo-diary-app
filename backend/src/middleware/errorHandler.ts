import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  if (process.env.NODE_ENV !== 'test') {
    // Log server-side for debugging; avoid leaking stack traces to clients
    // eslint-disable-next-line no-console
    console.error(err);
  }
  res.status(status).json({ message });
}
