import mongoose from 'mongoose';
import * as User from '@/models/user';
import { connectMock, disconnectMock } from '@/utils/util';

const initUsers = [{ name: 'user1' }, { name: 'user2' }, { name: 'user3' }];
let users: User.User[] = [];

describe('model/user', () => {
  beforeAll(connectMock(mongoose, 'jest-models'));
  beforeEach(async () => {
    await User.UserModel.deleteMany({});
    users = await User.UserModel.insertMany(initUsers);
  });
  afterAll(disconnectMock(mongoose));

  describe('find', () => {
    test('should get user list', async () => {
      const docs = await User.find();
      expect(docs.length).toBe(3);
    });
  });
  describe('findOne', () => {
    test('should get user', async () => {
      const doc = await User.findOne({ _id: users[0]._id });
      if (!doc) {
        return;
      }
      expect(doc.name).toEqual(users[0].name);
      expect(doc.createdAt instanceof Date).toBeTruthy();
      expect(mongoose.isValidObjectId(doc._id)).toBeTruthy();
    });
    test('should fail to get user', async () => {
      await expect(User.findOne({ _id: '' })).rejects.toThrow();
    });
  });
  describe('create', () => {
    test('should create user', async () => {
      const doc = await User.create({ name: 'user4' });
      expect(doc.name).toBe('user4');
    });
    describe('validation', () => {
      test('should fail to create duplicate user', async () => {
        await expect(User.create({ name: 'user1' })).rejects.toThrow();
      });
      test('should fail to create blank user', async () => {
        await expect(User.create({} as User.User)).rejects.toThrow();
      });
    });
  });
});
