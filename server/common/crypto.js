import crypto from "crypto";

const IV_LENGTH = 16;
const ENC_KEY = crypto.randomBytes(32);

function toText(data) {
  if (typeof data === "object") {
    return JSON.stringify(data);
  }
  if (typeof data === "string") {
    return data;
  }
  return data.toString();
}

function toData(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return text;
  }
}

export function encrypt(data) {
  let text = toText(data);
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv("aes-256-cbc", ENC_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ":" + encrypted;
}

export function decrypt(cipherText) {
  let [ivHex, encrypted] = cipherText.split(":");
  let iv = Buffer.from(ivHex, "hex");

  let decipher = crypto.createDecipheriv("aes-256-cbc", ENC_KEY, iv);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return toData(decrypted);
}
