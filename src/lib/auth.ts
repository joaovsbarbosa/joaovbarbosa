import crypto from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function getExpectedSessionToken() {
  return crypto.createHmac("sha256", getSecret()).update("admin-session").digest("hex");
}

export function checkPassword(password: string) {
  const secret = getSecret();
  if (!secret) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function isValidSessionToken(token: string | undefined) {
  if (!token) return false;
  const expected = getExpectedSessionToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
