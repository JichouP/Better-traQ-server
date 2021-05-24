import { RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (_req, res) => {
  res.sendStatus(404);
};

export default notFoundHandler;
