import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function connectDatabase() {
	mongoose
		.connect(process.env.MONGO_URI!)
		.then(async () => {
			console.log("Database connected!");
		})
		.catch((err) => {
			console.log(err.message, err.name);
		});
}
