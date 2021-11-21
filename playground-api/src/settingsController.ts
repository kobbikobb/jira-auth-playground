import * as express from 'express';
import * as settingsModel from './settingsModel';

export const getSettings = async (req: express.Request, res: express.Response) => {
  const userId = req.query.userId as string;
  const settings = await settingsModel.getSettings(userId);
  res.json(settings);
};

export const putSettings = async (req: express.Request, res: express.Response) => {
   const inputSettings = req.body as settingsModel.ISettings;

   const existingSettings = await settingsModel.getSettings(inputSettings.userId);
   if(existingSettings) {

     if(inputSettings.clientId != undefined) {
       existingSettings.clientId = inputSettings.clientId ;
     }

     if(inputSettings.secret != undefined) {
      existingSettings.secret = inputSettings.secret ;
    }

    await existingSettings.save();
    res.json(existingSettings);
    
   } else {
    const createdSettings = await settingsModel.createSettings(inputSettings);
    res.json(createdSettings);
   }
};