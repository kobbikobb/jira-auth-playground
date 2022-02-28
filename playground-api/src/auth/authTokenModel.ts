import {model, Schema, Model, Document } from 'mongoose';

export interface IAuthToken extends Document {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  createdAt: Date;
}

export const AuthTokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresIn: { type: Number, required: true },
  tokenType: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

export const AuthToken: Model<IAuthToken> = model('AuthToken', AuthTokenSchema);

export const createAuthToken = (authToken: IAuthToken) => {
  return AuthToken.create(authToken);
}

export const getAuthTokens = async (userId: string) => {
  return AuthToken.find({ userId });
}

export const getNewestAuthToken = async (userId: string) => {
  const authTokens = await AuthToken.find({ userId }).sort( {createdAt: 'desc'}).limit(1);
  if(authTokens.length > 0) {
    return authTokens[0];
  }
  return null;
}