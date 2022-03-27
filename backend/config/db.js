import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParse: true,
            useCreateIndex: false
        })

        console.log(`MongoDB connected ${conn.connect.host}`)

    } catch (error) {
        console.error(`Error:${error.message}`)

    }
}

export default connectDB