import mongoose from "mongoose"

console.log("MONGO_URL: " + process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)

export default mongoose
