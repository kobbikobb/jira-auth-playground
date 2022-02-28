import axios from 'axios';

// TODO: Read from browser or solve otherwise?
const userId = 'userId12';

const baseUrl = 'http://localhost:8081';

export const getSettings = async () => {
  const result = await axios({
    method: 'GET',
    url: `${baseUrl}/api/settings?userId=${userId}`,
  });

  return result.data;
};


export const saveSettings = async ({clientId, secret}) => {
  const result = await axios({
    method: 'PUT',
    url: `${baseUrl}/api/settings`,
    data: {
      userId,
      clientId,
      secret
    }
  });

  return result.data;
};

export const getAuthLink = async () => {
  const result = await axios({
    method: 'GET',
    url: `${baseUrl}/api/auth/link?userId=${userId}`,
  });

  return result.data.url;
};

export const setAuthCode = async code => {
  const result = await axios({
    method: 'POST',
    url: `${baseUrl}/api/auth/code`,
    data: {
      userId,
      code,
    }
  });

  return result.data;
};

export const getAuthTokens = async () => {
  const result = await axios({
    method: 'GET',
    url: `${baseUrl}/api/auth/tokens?userId=${userId}`,
  });

  return result.data;
};

export const getNewestAuthToken = async () => {
  const result = await axios({
    method: 'GET',
    url: `${baseUrl}/api/auth/tokens/newest?userId=${userId}`,
  });

  return result.data;
};
