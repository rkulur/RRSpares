import mongoose, { InferSchemaType, Schema } from 'mongoose';

const BrandSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    countryOfOrigin: {
      type: String,
      required: true
    }
  });

  export type BrandType = InferSchemaType<typeof BrandSchema>;

  const BrandModel = mongoose.model<BrandType>('Brand',BrandSchema)

  export default BrandModel
  