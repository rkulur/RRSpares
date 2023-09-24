import { Request, Response } from "express";
import { UserSchema, UserType } from "../Model";
import bcrypt from "bcryptjs";
import { sendToken } from "../Utils/token";
import { UserRequest } from "../Interface/interface";
import { errorHandler, successHandler } from "../Utils/errorHandler";
import { sendPasswordResetEmail } from "../Utils/handleEmail";

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password }: UserType = req.body;
		const isUserPresent = await UserSchema.findOne({ email });
		if (isUserPresent) {
			return errorHandler(res, 400, "User already exists!");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password!, salt);
		const user = await new UserSchema({
			firstName,
			lastName,
			email,
			password: hashedPass,
		}).save();

		successHandler(res, 201, "Registered successfully!");
	} catch (err: any) {
		errorHandler(res, 500, err.message);
	}
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const currentUser = await UserSchema.findOne({ email }).select("+password");
		if (!currentUser) {
			return errorHandler(res, 404, "User not found!");
		}

		const comparePassword = await bcrypt.compare(password, currentUser.password!);

		if (!comparePassword) {
			return errorHandler(res, 401, "Invalid credentials!");
		}

		sendToken(res, { id: currentUser._id });
	} catch (err: any) {
		errorHandler(res, 500, err.message);
	}
};

// RESET EMAIL
export const initiateResetPassword = async (req: Request, res: Response) => {
	try {
		const { email }: UserType = req.body;

		const isEmailValid = await UserSchema.findOne({ email });

		if (!isEmailValid || !email) {
			return errorHandler(res, 401, "Invalid Email!");
		}

		const emailSent = await sendPasswordResetEmail(email, isEmailValid._id.toString());

		if (!emailSent) {
			return errorHandler(res, 500, "Error while sending reset email!");
		}

		successHandler(res, 200, "Email sent successfully!");
	} catch (err: any) {
		errorHandler(res, 500, err.message);
	}
};

// PASSWORD RESET
export const resetPassword = async (req: Request, res: Response) => {
	try {
		const resetUserId = req.params.id;
		const { password, confirmPassword }: { password: string; confirmPassword: string } = req.body;

		if (password !== confirmPassword) {
			return errorHandler(res, 400, "Password doesn't match with confirm password!");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password, salt);
		await UserSchema.findByIdAndUpdate(resetUserId, { $set: { password: hashedPass } }, { new: true });
		successHandler(res, 200, "Password reset successfully!");
	} catch (err: any) {
		errorHandler(err, 500, err.message);
	}
};

// GET USER DETAILS
export const getUserDetails = async (req: UserRequest, res: Response) => {
	const id = req.user?._id;
	if (!id) {
		return res.status(404).json({ success: false, message: "User not found" });
	}

	try {
		const user = await UserSchema.findById(id);
		const userDetails = { firstName: user?.firstName, lastName: user?.lastName, email: user?.email };
		successHandler(res, 200, "User details fetched successfully!", { userDetails });
	} catch (error: any) {
		errorHandler(res, 500, "Failed fetching user details!");
	}
};

// UPDATE USER DETAILS
export const updateUserDetails = async (req: UserRequest, res: Response) => {
	const { firstName, lastName, email } = req.body;
	try {
		const id = req.user?._id;

		let fieldsToUpdate: { firstName?: string; lastName?: string; email?: string } = {};
		if (!email) {
			fieldsToUpdate.firstName = firstName;
			fieldsToUpdate.lastName = lastName;
		} else {
			fieldsToUpdate.email = email;
		}
		const updatedUser = await UserSchema.findByIdAndUpdate({ _id: id }, { $set: fieldsToUpdate }, { new: true });

		successHandler(res, 200, `User updated successfully!`, { updatedUser });
	} catch (error: any) {
		errorHandler(res, 500, error.message);
	}
};

// GET ROLE
export const getRole = async (req: UserRequest, res: Response) => {
	const role = req.user?.role;
	successHandler(res, 200, `Fetched role successfully!`, { role });
};
