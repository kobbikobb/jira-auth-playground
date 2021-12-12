import * as express from 'express';
import * as settingsModel from '../settings/settingsModel';
import * as authTokenModel from './authTokenModel';
import * as authUtils from './authUtils';

const HTTP_STATUS = {
  NOT_FOUND: 404,
  ERROR: 500,
};

export const getAuthLink = async (req: express.Request, res: express.Response) => {
  const userId = req.query.userId as string;

  const settings = await settingsModel.getSettings(userId);
  if(!settings){
    res.status(HTTP_STATUS.NOT_FOUND).send('Settings not found.');
    return;
  }

  const clientId = settings.clientId;
  const authLink = authUtils.getAuthLink(clientId);

  res.json({
    url: authLink,
  });
};

export const setAuthCode = async (req: express.Request, res: express.Response) => {
  const {userId, code} = req.body;
  const settings = await settingsModel.getSettings(userId);
  if(!settings){
    res.status(HTTP_STATUS.NOT_FOUND).send('Settings not found.');
    return;
  }

  try {
    const authToken = await authUtils.getAuthToken(settings.clientId, settings.secret, code);

    const authTokenInput = {
      userId,
      accessToken: authToken.access_token,
      refreshToken: authToken.refresh_token,
      expiresIn: authToken.expires_in,
      tokenType: authToken.token_type,
      createdAt: new Date(),
    } as authTokenModel.IAuthToken;
    const newAuthToken = await authTokenModel.createAuthToken(authTokenInput);

    res.json({
      jiraToken: authToken,
      savedToken: newAuthToken,
    });

  } catch(error) {
    res.status(HTTP_STATUS.ERROR).json({
      error,
    });
  }

};

export const getAuthTokens = async (req: express.Request, res: express.Response) => {
  const userId = req.query.userId as string;

  const authTokens = await authTokenModel.getAuthTokens(userId);

  res.json({
     authTokens
  });
};