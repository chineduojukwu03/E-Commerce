import mongoose from 'mongoose'
import bcrypt, { compare } from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        requred: true
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.pre(save, async function (next) {
    if (!this.isModified('password'))
        next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
User = mongoose.model('User', userSchema)

export default User