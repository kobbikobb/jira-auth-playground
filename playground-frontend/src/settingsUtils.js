import { getCookie, setCookie } from "./cookieUtils";

const CLIENT_ID = "playground-client-id";
const SECRET = "playground-secret";
const AUTH_CODE = "playground-auth-code";
const AUTH_TOKEN = "playground-auth-token";

export function getClientId() {
  return getCookie(CLIENT_ID);
}

export function getSecret() {
  return getCookie(SECRET);
}

export function getCode() {
  return getCookie(AUTH_CODE);
}

export function getToken() {
  const token = getCookie(AUTH_TOKEN);
  if(!token) {
    return {};
  }
  return JSON.parse(token);
}

export function setClientId(value) {
  return setCookie(CLIENT_ID, value);
}

export function setSecret(value) {
  return setCookie(SECRET, value);
}

export function setCode(value) {
  return setCookie(AUTH_CODE, value);
}

export function setToken(value) {
  return setCookie(AUTH_TOKEN, JSON.stringify(value));
}