import getPocketRequestToken from "@/helpers/getPocketRequestToken";
import { NextResponse } from "next/server";

export const GET = async() => {
    try {
        const getAccessToken = await getPocketRequestToken();
        const token = getAccessToken.split("=");

        // console.log(req)

        return NextResponse.json({
            code: token[1],
            consumerKey: process.env.POCKET_CONSUMER_KEY,
            redirect_uri: process.env.REDIRECT_URI
        })

    } catch (error) {
        return NextResponse.json({
            error: `Couldnt get access token. Error: ${error}`
        })
    }
}