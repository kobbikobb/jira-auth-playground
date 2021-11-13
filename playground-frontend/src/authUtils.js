import axios from 'axios';

const REDIRECT_URL = "https://localhost:3000/token";
const SCOPES = ["read:jira-user", "read:jira-work", "offline_access"];

const AUTH_BASE_URL = "https://auth.atlassian.com";

export function getAuthLink(clientId) {
  return (
    `${AUTH_BASE_URL}/authorize?audience=api.atlassian.com` +
    `&client_id=${clientId}` +
    `&scope=${encodeURIComponent(SCOPES.join(" "))}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    "&response_type=code" +
    "&prompt=consent"
  );
}

export async function getAuthToken(clientId, secret, code) {
  const result = await axios({
      method: 'POST',
      url: `${AUTH_BASE_URL}/oauth/token`,
      data: {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: secret,
          redirect_uri: REDIRECT_URL,
          code
        },
  });
  return result.data;
}
