import { RequestHandler } from 'express';
import * as User from '@/models/user';

export const find: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const data = await User.findOne({ _id: id }).catch((reason) => {
    res.status(400).send('Bad Request');
    next(reason);
  });
  res.status(200).send(data);
};
export const findList: RequestHandler = async (req, res, next) => {
  const data = await User.find().catch((reason) => {
    res.status(400).send('Bad Request');
    next(reason);
  });
  res.status(200).send(data);
};

export const create: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Bad Request');
  }
  const account = await User.findOne({ name });
  if (account) {
    return res.status(400).send('Bad Request');
  }

  const data = await User.create({ name }).catch((reason) => {
    res.status(400).send('Bad Request');
    console.error(reason);
    next(reason);
  });
  res.status(201).send(data);
};
