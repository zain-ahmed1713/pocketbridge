import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import connect from "@/dbConnect/dbConnect";
import retrieveArticlesFromPocket from "@/helpers/retrieveArticlesFromPocket";

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const reqBody = await req.json();
    const { username } = reqBody;

    const findUser: any = await userModel.findOne({ username });

    if (!findUser) {
      return NextResponse.json({
        message: "User doesn't exist",
      });
    }

    const { _id, pocketToken, serviceStatus, lastFetched } = findUser;

    if (pocketToken) {
      if (serviceStatus) {
        const date = new Date(lastFetched);
        const timeStampSeconds = Math.floor(date.getTime() / 1000);

        const fetchArticles: any = await retrieveArticlesFromPocket({
          pocketToken,
          timeStampSeconds,
        });

        await userModel.findByIdAndUpdate(_id, {
          lastFetched: fetchArticles.since,
        });

        return NextResponse.json({
          articles: fetchArticles,
        });
      } else {
        return NextResponse.json({
          message: "User's service status is off",
        });
      }
    }

    return NextResponse.json({
      message: "User does not have Pocket Token",
    });
  } catch (error) {
    return NextResponse.json({
      error: `Couldnt fetch articles. Error: ${error}`,
    });
  }
};
