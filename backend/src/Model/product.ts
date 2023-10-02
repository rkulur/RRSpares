import mongoose, { InferSchemaType, Schema } from "mongoose";

const ProductSchema = new Schema({
	pName: {
		type: String,
		required: true,
	},
	pDescription: {
		type: String,
		required: true,
	},
	pImages: {
		required: true,
		type: [String],
		min: 1,
		max: 5,
	},
	pCurrentPrice: {
		type: Number,
		required: true,
	},
	pPreviousPrice: Number,
	pCategory: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "PartsCategory",
	},
	pModel: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "Model",
	},
	pBrand: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: "Brand",
	},
	pColor: [String],
});

export type ProductType = InferSchemaType<typeof ProductSchema> & { _id: Schema.Types.ObjectId };

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
