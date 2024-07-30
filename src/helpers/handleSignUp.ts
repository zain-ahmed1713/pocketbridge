import axios from "axios";
import toast from "react-hot-toast";

interface SignupData {
    username: string;
    email: string;
    password: string;
}

const handleSignUp = async (data: SignupData): Promise<void> => {
    try {
        const saveUser: any = await axios.post('/api/signup', data);
        // console.log("User:", saveUser.data);
        return saveUser;

    } catch (error: any) {
        console.error("Error during sign up:", error.message);
        toast.error(error.message);
    }
}

export default handleSignUp;