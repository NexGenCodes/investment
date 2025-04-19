import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.ENCRYPTION_KEY!, "hex");

export function encrypt(data: unknown) {
  try {
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encrypted };
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
}

export function decrypt(encrypted: string, iv: string): unknown | null {
  try {
    const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
