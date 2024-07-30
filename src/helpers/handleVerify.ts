import axios from "axios";
import toast from "react-hot-toast";

interface verificationCode {
    username: string;
    verificationCode: string;
}

const handleVerify = async (data: verificationCode) => {
    try {
        const verifyUser = await axios.post('/api/verify', data);
        
        return verifyUser;
    } catch (error: any) {
        console.log("Error verifying user. Error:", error.message);
        toast(error.message)
    }
}
export default handleVerify