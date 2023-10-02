import mongoose, { InferSchemaType, Schema } from "mongoose";

const ModelSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	brand: {
		type: Schema.Types.ObjectId,
		ref: "Brand",
		required: true,
	},
	modelImg: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	variants: {
		type: [String],
		required: true,
	},
});

export type ModelType = InferSchemaType<typeof ModelSchema>;

const Model = mongoose.model<ModelType>("Model", ModelSchema);

export default Model;
