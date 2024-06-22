export const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    expire: 1000 * 60 * 15,
  });

  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expire: 1000 * 60 * 60 * 24 * 30,
  });
};
