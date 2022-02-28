import axios from 'axios';

const REDIRECT_URL = "https://localhost:3000/token";
const SCOPES = ["read:jira-user", "read:jira-work", "offline_access"];

const JIRA_AUTH_BASE_URL = "https://auth.atlassian.com";
const JIRA_API_BASE_URL = "https://api.atlassian.com";

export function getAuthLink(clientId) {
  return (
    `${JIRA_AUTH_BASE_URL}/authorize?audience=api.atlassian.com` +
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
      url: `${JIRA_AUTH_BASE_URL}/oauth/token`,
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

export async function getAccessibleResources(accessToken) {
  const result = await axios({
    method: 'GET',
    url: `${JIRA_API_BASE_URL}/oauth/token/accessible-resources`,
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  return result.data;
}