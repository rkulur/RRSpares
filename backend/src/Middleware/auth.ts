import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel, { UserType } from "../Model/user";
import { errorHandler } from "../Utils/errorHandler";

export interface AuthRequest extends Request {
	user?: UserType;
	role?: string;
	cookies: { token: string };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const { token } = req.cookies;
		if (!token) {
			return errorHandler(res,404,"Token required")
		}
		const { id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

		const user = await UserModel.findById(id);

		if (!user) {
			return errorHandler(res,401,"Authentication failed!")
		}

		req.user = user;
		next();
	} catch (error: any) {
		console.log(error.message, error.stack.pathname);
		errorHandler(res,500,"Error during authentication");
	}
};