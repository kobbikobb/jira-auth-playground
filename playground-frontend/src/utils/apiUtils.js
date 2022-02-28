import axios from 'axios';

// TODO: Read from browser or solve otherwise?
const userId = 'userId12';

export const getSettings = async () => {
  const result = await axios({
    method: 'GET',
    url: `http://localhost:8081/api/settings?userId=${userId}`,
  });

  return result.data;
};


export const saveSettings = async ({clientId, secret}) => {
  const result = await axios({
    method: 'PUT',
    url: 'http://localhost:8081/api/settings',
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
    url: `http://localhost:8081/api/auth/link?userId=${userId}`,
  });

  return result.data.url;
};

export const setAuthCode = async code => {
  const result = await axios({
    method: 'POST',
    url: 'http://localhost:8081/api/auth/code',
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
    url: `http://localhost:8081/api/auth/tokens?userId=${userId}`,
  });

  return result.data;
};

export const getNewestAuthToken = async () => {
  const result = await axios({
    method: 'GET',
    url: `http://localhost:8081/api/auth/tokens/newest?userId=${userId}`,
  });

  return result.data;
};
