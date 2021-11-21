import axios from 'axios';

export const getSettings = async () => {
  // TODO: Read from browser
  const userId = 'userId12';

  const result = await axios({
    method: 'GET',
    url: `http://localhost:8081/api/settings?userId=${userId}`,
  });

  return result.data;
};


export const saveSettings = async ({clientId, secret}) => {
  // TODO: Read from browser
  const userId = 'userId12';

  const result = await axios({
    method: 'PUT',
    url: `http://localhost:8081/api/settings?userId=${userId}`,
    data: {
      userId,
      clientId,
      secret
    }
  });

  return result.data;
};