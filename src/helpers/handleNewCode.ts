import axios from "axios";
import toast from "react-hot-toast";

interface newVerificationCode {
    username: string;
}

const handleNewCode = async (data: newVerificationCode) => {
    try {
        const newCode = await axios.post('/api/regenerate-code', data);
        
        return newCode;
    } catch (error: any) {
        console.log("Error verifying user. Error:", error.message);
        toast(error.message)
    }
}
export default handleNewCode