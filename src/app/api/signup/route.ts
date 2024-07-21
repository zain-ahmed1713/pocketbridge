import connect from "@/dbConnect/dbConnect";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export const POST = async(request: NextRequest) => {
    await connect();
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const isUsernameAvailable = await userModel.findOne({username});
        const isEmailAvailable = await userModel.findOne({email});
        // console.log(isUsernameAvailable)
        if(isUsernameAvailable) {
            return NextResponse.json({
                message: "Username already exists"
            })
        }

        if(isEmailAvailable) {
            return NextResponse.json({
                message: "Email already exists"
            })
        }

        if(password?.length < 6) {
            return NextResponse.json({
                message: "Password must be at least 6 characters long"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const verificationCode = Math.floor(Math.random() * 10000 + 1000).toString()
        const sendEmail = await sendVerificationEmail(email, verificationCode)

        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const createUser = new userModel({
            username,
            email,
            password: hashedPassword,
            verificationCode: verificationCode,
            verificationTokenExpiry: expiryDate
        })

        const savedUser = await createUser.save()


        return NextResponse.json({
            message: "User Created Successfully"
        })

    } catch (error) {
        NextResponse.json({
            error: `Couldn't create user. Error: ${error}`
        })
    }
}