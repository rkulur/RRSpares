import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateHash(data: string) {
	const hash = crypto.createHash("sha256");
	return hash.update(data + Date.now().toString()).digest("hex");
}
