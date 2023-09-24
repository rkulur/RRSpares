import mongoose, {InferSchemaType, Schema} from 'mongoose';

const PartsCategorySchema = new Schema({
    categoryName : {
        type : String,
        required : true
    }
})

export type PartsCategoryType = InferSchemaType<typeof PartsCategorySchema>

const PartsCategoryModel = mongoose.model<PartsCategoryType>("PartsCategoryModel", PartsCategorySchema)

export default PartsCategoryModel