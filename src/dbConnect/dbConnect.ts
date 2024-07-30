import mongoose from "mongoose";

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB Connected Successfully");
        })

        connection.on('error', (err) => {
            console.log("Failed to connect MongoDB. Error:", err);
            process.exit();
        })

    } catch (error) {
        console.log("Error:", error);
    }
}

export default connect;