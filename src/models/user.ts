import {
  prop,
  defaultClasses,
  modelOptions,
  getModelForClass,
} from '@typegoose/typegoose';

export interface User extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: { collection: 'user' },
})
export class User extends defaultClasses.TimeStamps {
  @prop({ unique: true })
  public name!: string;

  @prop()
  authToken?: string;
}

export const UserModel = getModelForClass(User);

export const find = async (): Promise<User[]> => {
  return UserModel.find();
};
export const findOne = async (
  query: Record<string, unknown>
): Promise<User | null> => {
  return UserModel.findOne(query);
};
export const create = async (user: { name: string }): Promise<User> => {
  if (!user || !user.name) {
    throw new Error();
  }
  return UserModel.create({
    name: user.name,
  });
};
