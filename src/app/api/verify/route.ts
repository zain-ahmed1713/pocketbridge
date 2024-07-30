import { NextRequest, NextResponse } from "next/server"
import connect from "@/dbConnect/dbConnect"
import userModel from "@/models/userModel";

export const POST = async (request: NextRequest) => {
    await connect();
    try {
        const reqBody = await request.json();
        const {username, verificationCode} = reqBody;

        const user = await userModel.findOne({username});
        // console.log(new Date(user.verificationTokenExpiry));

        if(!user) {
            return NextResponse.json({
                message: "User does not exist"
            })
        }

        if(user.isVerified) {
            return NextResponse.json({
                message: "User already verified"
            })
        } 

        
        if(new Date(user.verificationTokenExpiry) > new Date()) {
            if(user.verificationCode === verificationCode) {
                await userModel.findByIdAndUpdate(user._id, {isVerified: true});
                return NextResponse.json({
                    message: "User verified"
                })
            }

            return NextResponse.json({
                message: "Verification code is wrong"
            }) 
        }

        return NextResponse.json({
            message: "Confirmation time exceeded. Please generate a new code"
        })

    } catch (error) {
        return NextResponse.json({
            message: `Couldn't verify user. Error: ${error}`
        })
    }
}