import * as express from 'express';
import * as settingsModel from './settingsModel';

export const getSettings = async (req: express.Request, res: express.Response) => {
  const userId = req.query.userId as string;
  const settings = await settingsModel.getSettings(userId);
  res.json(settings);
};

export const postSettings = async (req: express.Request, res: express.Response) => {
   const inputSettings = req.body as settingsModel.ISettings;
   const createdSettings = await settingsModel.createSettings(inputSettings);
   res.json(createdSettings);
};