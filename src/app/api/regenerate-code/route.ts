import connect from "@/dbConnect/dbConnect";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

export const POST = async(request: NextRequest) => {
    await connect();
    try {
        const reqBody = await request.json();
        const { username } = reqBody;

        const user = await userModel.findOne({username});
        
        const verificationCode = Math.floor(Math.random() * 10000 + 1000).toString()
        const sendEmail = await sendVerificationEmail(user.email, verificationCode)

        const expiryDate = new Date();
        const setVerificationTokenExpiry = expiryDate.setHours(expiryDate.getHours() + 1);

        const saveNewCode = new userModel({
            verificationCode: verificationCode,
            verificationTokenExpiry: setVerificationTokenExpiry
        })

        const codeSaved = await saveNewCode.save()


        return NextResponse.json({
            message: "New code has been generated"
        })

    } catch (error) {
        NextResponse.json({
            error: `Couldn't generate new code. Error: ${error}`
        })
    }
}