import mongoose from "mongoose";

export const connectDb = async () => {
    await
        mongoose.connect(
            process.env.MONGO_URI
        ).then(() => console.log("Db connected"))
            .catch((error) => console.log(`Error occur from Db ${error}`))
}