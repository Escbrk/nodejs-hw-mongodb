import { TOKEN_PERIOD } from "../constants/constants.js";

export const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    expire: TOKEN_PERIOD.DAYS_30,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expire: TOKEN_PERIOD.DAYS_30,
  });
};
