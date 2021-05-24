import mongoose from 'mongoose';
import request from 'supertest';
import app from '@/app';
import { connectMock, disconnectMock } from '@/utils/util';

describe('integration user', () => {
  beforeAll(connectMock(mongoose, 'jest-integration'));
  afterAll(disconnectMock(mongoose));

  test('should 404', async () => {
    await request(app).get('/').expect(404);
  });
});
