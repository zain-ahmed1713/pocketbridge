import getUserPocketAccessToken from "@/helpers/getUserPocketAccessToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import connect from "@/dbConnect/dbConnect";

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const reqBody = await req.json();
    const { requestToken } = reqBody;

    const user = await getUserPocketAccessToken(requestToken);

    const params = new URLSearchParams(user);
    const accessToken = params.get("access_token");
    const username = params.get("username");

    const email = username?.replace("%40", "@");

    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return NextResponse.json({
        message: "Your Pocket and PocketBridge's username must be same",
      });
    }

    if (findUser.pocketToken) {
      return NextResponse.json({
        message: "Pocket account already authorized",
      });
    }

    await userModel.findByIdAndUpdate(findUser._id, {
      pocketToken: accessToken,
    });

    return NextResponse.json({
      message: "Pocket account authorized",
    });
  } catch (error) {
    return NextResponse.json({
      error: `Couldnt authorize pocket account. Error: ${error}`,
    });
  }
};
