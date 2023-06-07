import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UserModel from "../Model/user";

interface PayloadType {
  id: mongoose.Types.ObjectId;
}

export async function sendToken(res: Response, payload: PayloadType) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const getRole = await UserModel.findById(payload.id);

  res
    .cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
    .status(200)
    .json({ success: true , token , expireDays : 1, role : getRole && getRole.role });
}
