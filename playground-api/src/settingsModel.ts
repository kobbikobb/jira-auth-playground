import {model, Schema, Model, Document } from 'mongoose';

export interface ISettings extends Document {
  userId: string;
  clientId: string;
  secret: string;
}

export const SettingsSchema: Schema = new Schema({
  userId: { type: String, required: true },
  clientId: { type: String, required: false },
  secret: { type: String, required: false },
});

export const Settings: Model<ISettings> = model('Settings', SettingsSchema);

export const createSettings = (settings: ISettings) => {
  return Settings.create(settings);
}

export const getSettings = async (userId: string) => {
  return Settings.findOne({ userId });
}