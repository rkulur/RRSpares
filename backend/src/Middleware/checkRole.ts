import { NextFunction, Response } from "express";
import UserModel from "../Model/user";
import { AuthRequest } from "./auth";
import { errorHandler } from "../Utils/errorHandler";

const checkIfAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const role = req.user?.role;

		if (!role) {
			return errorHandler(res,403,"Role authentication failed!")
		}

		if (role == "user") {
			return errorHandler(res,401,"Unauthorized Role!")
		}
		next();
	} catch (error: any) {
		console.log(error.message, error.stack);
	}
};

export default checkIfAdmin;
