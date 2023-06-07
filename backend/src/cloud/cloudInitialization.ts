import fbAdmin from "firebase-admin";
import fbConfig from "../config/fbConfig.json";

fbAdmin.initializeApp({
	credential: fbAdmin.credential.cert(fbConfig as fbAdmin.ServiceAccount),
	storageBucket: process.env.STORAGE_BUCKET_NAME,
});

export const bucket = fbAdmin.storage().bucket();
