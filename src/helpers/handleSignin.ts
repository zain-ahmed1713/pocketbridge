import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface SigninData {
    username: string;
    password: string;
}

const handleSignin = async (data: SigninData): Promise<void> => {
    try {
       const signin: any = await signIn('credentials', {
            username: data.username,
            password: data.password,
            redirect: false
        })

        return signin;

    } catch (error: any) {
        console.error("Error signing in:", error.message);
        toast.error(error.message);
    }
}

export default handleSignin;