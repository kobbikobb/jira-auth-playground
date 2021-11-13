import React from "react";
import { getCookie } from "./cookieUtils";

const AUTH_TOKEN = "playground-auth-token";

const SitePicker = () => {
  const authToken = getCookie(AUTH_TOKEN);

  return (
    <div>
      Site picker for token {authToken}
    </div>
  );
};

export default SitePicker;