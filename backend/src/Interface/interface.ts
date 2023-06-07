import { UserType } from "../Model/user";
import { Request } from "express";

export interface UserRequest extends Request {
	user?: UserType;
	role?: string;
}

export interface UploadOptions {
	destination: string;
	metadata: {
		contentType: string;
	};
}
