import mongoose,{ InferSchemaType, Schema, model } from "mongoose";



const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name should have minimum of 3 characters"],
    maxLength: 25,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [1, "Last name should have minimum of 1 characters"],
    maxLength: 25,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email should be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  role : {
    type : String,
    default : 'user'
  },
  date : {
    type : Date,
    default : Date.now
  }
});

export type UserType = InferSchemaType<typeof UserSchema> & {_id : mongoose.Types.ObjectId}

const UserModel = model<UserType>("User", UserSchema);

export default UserModel;